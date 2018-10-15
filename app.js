// Import required modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Import handlebars and configure with helper functions
var exphbs = require('express-handlebars');
var handlebars = require('./app/helpers/handlebars.js')(exphbs);

// Import rout files
var api_routes = require('./app/routes/api');
var web_routes = require('./app/routes/web');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup server port
var port = process.env.PORT || 8080;

// Frontend configurations for template engine
app.engine('.hbs', handlebars.engine, exphbs({ defaultLayout: 'layout', extname: '.hbs', layoutsDir: './web/views/layouts' }));
app.set('view engine', '.hbs');
// Set directory for template views
app.set('views', __dirname + '/web/views/');
app.set('view options', { layout: 'layout' });


mongoose.Promise = global.Promise;
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-ltfu2.mongodb.net:27017,cluster0-shard-00-01-ltfu2.mongodb.net:27017,cluster0-shard-00-02-ltfu2.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useMongoClient: true });


var db = mongoose.connection;

// API routes
app.use('/api', api_routes);
// Web routes
app.use('/', web_routes);


app.listen(port, function() {
    console.log("Running on port " + port);
});
