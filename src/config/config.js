require('dotenv').config({  path: process.env.NODE_ENV === "development" ? "dev.env" : ".env"});
module.exports = { 
 development: {   
  username: process.env.DB_USER,
  password: process.env.DB_PASS,    
  database: process.env.DB_NAME,    
  host: process.env.DB_HOST,    
  dialect: process.env.DB_DIALECT,    
  storage: process.env.DB_STORAGE,    
   define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      freezeTableName: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'      
     }
   },
 },
 production: {
  username: process.env.DB_USER,
   password: process.env.DB_PASS,    
   database: process.env.DB_NAME,    
   host: process.env.DB_HOST,    
   dialect: process.env.DB_DIALECT,    
   storage: process.env.DB_STORAGE,    
   define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      freezeTableName: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'      
     }
   },
 }
};
