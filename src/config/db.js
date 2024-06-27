import mysql from "mysql";

// // const con = mysql.createConnection({
// //   host: "127.0.0.1",
// //   port: "3308",
// //   user: "root",
// //   password: "",
// //   database: "niichadb",
// //   timezone: 'z',
// //   connectionLimit: 50,
// //   queueLimit: 0,
// //   waitForConnection: true
// // });

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


// Function to handle connection
const connectToDatabase = () => {
  con.connect((err) => {
    if (err) {
      if (err.code === 'ECONNRESET') {
        console.error('Connection was reset by the server:', err);
        // Optionally attempt to reconnect
      } else {
        console.error('Error connecting to the database:', err);
      }
    } else {
      console.log('Connected to the Database!');
    }
  });
  // Handle connection errors after initial connection
  con.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
      connectToDatabase(); // Reconnect on connection loss
    } else if (err.code === 'ECONNRESET') {
      console.error('Connection was reset by the server:', err);
      connectToDatabase(); // Optionally attempt to reconnect
    } else {
      console.error('Database error:', err);
      throw err;
    }
  });
};
// Connect to the database
connectToDatabase();

export default con;