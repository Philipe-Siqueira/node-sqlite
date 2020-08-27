require('dotenv').config({
 path: process.env.NODE_ENV === "development" 
 ? ".env.dev" 
 : ".env"
});
const express = require('express');
const database = require('./models');
const routes = require('./routes');
const cors = require('cors');
const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(routes);



const appName = process.env.NODE_APP_NAME || 'Project Base';
const PORT = process.env.NODE_APP_PORT || 80;
const HOST = process.env.NODE_APP_HOST || '0.0.0.0';
const URL = process.env.NODE_APP_URL || 'http://localhost';

database.sequelize.sync().then(() => {  
 app.listen(PORT, () => {    
  console.log(`Service: ${appName}. Active for ${HOST} on Address: ${URL}:${PORT}`);  
 });
})
 .catch(err => {
  console.error('Unable to connect to the database:', err);
 });
