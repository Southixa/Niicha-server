import mysql from "mysql";

const con = mysql.createPool({
  connectionLimit: 50,  // Adjust as needed
  waitForConnections: true,
  queueLimit: 0,
  host: "mysql-176882-0.cloudclusters.net",
  port: "19673",
  user: "admin",
  password: "QKKXdMfb",
  database: "NiichaDB",
  timezone: 'z'
});

export default con;

