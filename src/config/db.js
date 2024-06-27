import mysql from "mysql";

// const con = mysql.createConnection({
//   host: "mysql-176208-0.cloudclusters.net",
//   port: "19894",
//   user: "admin",
//   password: "aviT3RQD",
//   database: "NiichaDB",
//   timezone: 'z'
// });

const con = mysql.createConnection({
  host: "mysql-176478-0.cloudclusters.net",
  port: "10114",
  user: "admin",
  password: "GkrsCq81",
  database: "NiichaDB",
  timezone: 'z',
});

// Function to handle connection
const connectToDatabase = () => {
  con.connect((err) => {
    console.log("con.connect =>");
    console.log(err);
    // if (err) {
    //   if (err.code === 'ECONNRESET') {
    //     console.error('Connection was reset by the server:', err);
    //     // Optionally attempt to reconnect
    //   } else {
    //     console.error('Error connecting to the database:', err);
    //   }
    // } else {
    //   console.log('Connected to the Database!');
    // }
  });

  // Handle connection errors after initial connection
  con.on('error', (err) => {
    console.log("con.on =>");
    console.log(err);
    // if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    //   console.error('Database connection was closed.');
    //   connectToDatabase(); // Reconnect on connection loss
    // } else if (err.code === 'ECONNRESET') {
    //   console.error('Connection was reset by the server:', err);
    //   connectToDatabase(); // Optionally attempt to reconnect
    // } else {
    //   console.error('Database error:', err);
    //   throw err;
    // }
  });
};

// Connect to the database
connectToDatabase();

export default con;