import con from "../config/db.js";
import { EMessage, SMessage } from "../service/message.js";
import { SendError, SendSuccess } from "../service/response.js";
import { ValidateData } from "../service/validate.js";

export default class TableController {
  static async getAll(req, res) {
    try {
      const table = "select * from tables";
      con.query(table, function (err, result) {
        if (err) return SendError(res, 400, EMessage.NotFound, err);
        return SendSuccess(res, SMessage.selectAll, result);
      });
    } catch (error) {
      return SendError(res, 500, EMessage.Server, error);
    }
  }
  static async getOne(req, res) {
    try {
      const TID = req.params.TID;
      const mysql = "select * from tables where TID=?";
      con.query(mysql, TID, function (err, result) {
        if (err) return SendError(res, 400, EMessage.NotFound, err);
        return SendSuccess(res, SMessage.selectOne, result[0]);
      });
    } catch (error) {
      return SendError(res, 500, EMessage.Server, error);
    }
  }
  static async insert(req, res) {
    try {
      const { noTable, url } = req.body;
      const validate = await ValidateData({ noTable, url });
      if (validate.length > 0) {
        return SendError(res, 400, EMessage.PleaseInput + validate.join(","));
      }
      var dateTime = new Date()
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
      const insert =
        "insert into tables (noTable,url_web,createdAt,updatedAt) values (?,?,?,?)";
      con.query(
        insert,
        [noTable, url, dateTime, dateTime],
        (err) => {
          if (err) console.log(err);
          if (err) return SendError(res, 400, EMessage.ErrorInsert, err);
          return SendSuccess(res, SMessage.Insert);
        }
      );
    } catch (error) {
      return SendError(res, 500, EMessage.Server, error);
    }
  }
  static async updateTable(req, res) {
    try {
      const TID = req.params.TID;
      const { noTable, url } = req.body;
      const validate = await ValidateData({ noTable, url });
      if (validate.length > 0) {
        return SendError(res, 400, EMessage.PleaseInput + validate.join(","));
      }
      var dateTime = new Date()
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
      const mysql = "select * from tables where TID=?";
      const update =
        "update tables set noTable=?,url_web=? ,updatedAt=? where TID=?";
      con.query(mysql, TID, function (err, result) {
        if (err) return SendError(res, 404, EMessage.NotFound, err);
        if (!result[0]) return SendError(res, 404, EMessage.NotFound, err);
        con.query(
          update,
          [noTable, url, dateTime, TID],
          (error) => {
            if (error) return SendError(res, 400, EMessage.ErrorUpdate, error);
            return SendSuccess(res, SMessage.updated);
          }
        );
      });
    } catch (error) {
      return SendError(res, 500, EMessage.Server, error);
    }
  }
  static async deleteTable(req, res) {
    try {
      const TID = req.params.TID;
      const check = "SELECT * FROM tables WHERE TID = ?";
      const deletes = "DELETE FROM tables WHERE TID = ?";
      con.query(check, TID, (err) => {
        if (err) console.log(err);
        if (err) return SendError(res, 404, EMessage.NotFound, err);
        con.query(deletes, TID, (error) => {
          if (error) return SendError(res, 400, EMessage.ErrorDelete, error);
          return SendSuccess(res, SMessage.updated);
        });
      });
    } catch (error) {
      return SendError(res, 500, EMessage.Server, error);
    }
  }
}
