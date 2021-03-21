// Initial configurations
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const banner = "src/app/assets/banners/init.txt"
const hostname = '127.0.0.1';
const portEnv = 3000;
const morgan = require('morgan');
const routes = require('./routes/routes.js');
const cors = require('cors');
const img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRETCYS2ICmFJIQECnuJQmnLkv0pCz32Q01dQ&usqp=CAU';



//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes management
app.use('/', routes);
app.use(function(req, res, next){ // Exceptions
    res.status(404).send('<h2>Url not found :(</h2><img width="60%" src='+ img +' />');
});
// server configuration
app.set('port', process.env.PORT || portEnv);
app.listen(app.get('port'), hostname, () => {
    fs.readFile(banner, 'utf-8', (error, data) =>{
        console.log(data);
        console.log(`✓ Server running at http://${hostname}:${app.get('port')}/`);
        //database module
        const db = require('./database/connection.js');
        app.use(db);
    })
});