import mysql from "mysql";

// const con = mysql.createConnection({
//   host: "127.0.0.1",
//   port: "3308",
//   user: "root",
//   password: "",
//   database: "niichadb",
//   timezone: 'z',
//   connectionLimit: 50,
//   queueLimit: 0,
//   waitForConnection: true
// });

const con = mysql.createConnection({
  host: "mysql-176882-0.cloudclusters.net",
  port: "19673",
  user: "admin",
  password: "QKKXdMfb",
  database: "NiichaDB",
  timezone: 'z',
  connectionLimit: 50,
  queueLimit: 0,
  waitForConnection: true
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


export default con;

