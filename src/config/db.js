import mysql from "mysql";

const con = mysql.createPool({
  connectionLimit: 50,  // Adjust as needed
  waitForConnections: true,
  queueLimit: 0,
  host: "mysql-185042-0.cloudclusters.net",
  port: "19991",
  user: "admin",
  password: "7wrUn2LN",
  database: "NiichaDB",
  timezone: 'z'
});

// Check the connection when the pool is created
con.getConnection((err, connection) => {
  if (err) {
    switch (err.code) {
      case 'PROTOCOL_CONNECTION_LOST':
        console.error('Database connection was closed.');
        break;
      case 'ER_CON_COUNT_ERROR':
        console.error('Database has too many connections.');
        break;
      case 'ECONNREFUSED':
        console.error('Database connection was refused.');
        break;
      default:
        console.error('Database connection error:', err);
    }
  }
  if (connection) {
    console.log('Connected to database!');
    connection.release(); // Release the connection if successful
  }
});

export default con;

