 const sql = require('mssql');

   const config = {
     user: 'MSUNET2K\jgant4',
     password: '',
     server: 'COB-SQLSERVER01\CIS609', // or the address of your SQL Server
     database: 'DM_jgant4',
     options: {
       trustServerCertificate: true, // Use for self-signed certificates (if not using SSL)
     },
   };

   const pool = new sql.ConnectionPool(config);

   pool.connect((err) => {
     if (err) {
       console.error('Database connection failed:', err);
     } else {
       console.log('Connected to SQL Server');
     }
   });

   module.exports = pool;