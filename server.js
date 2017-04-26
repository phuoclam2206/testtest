/**
 * Created by phuoclam on 31/12/2016.
 */
var express     = require("express");
var mongoose    = require("mongoose");
var bodyParser  = require("body-parser");
var jwt         = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var session      = require('cookie-session');
var flash       = require('req-flash');
var fs          = require('fs');
var multer      = require('multer');
var uploadImage = multer({ dest : 'public/images/'});

var authencationController = require("./server/controllers/authencation-controller");
var japanController = require("./server/controllers/japan-controller");
var koreanController = require("./server/controllers/korean-controller");
var germanyController = require("./server/controllers/germany-controller");
var americanController = require("./server/controllers/american-controller");
var australiaController = require("./server/controllers/australia-controller");
var canadaController = require("./server/controllers/canada-controller");
var contactController = require("./server/controllers/contact-controller");
var classKoreanController = require("./server/controllers/class-korean-controller");

var clientJapanController = require("./server/controllers/client/asian/japan/japan-controller");
var clientKoreanController = require("./server/controllers/client/asian/korean/korean-controller");
var clientGermanyController = require("./server/controllers/client/euro/germany/germany-controller");
var clientAmericanController = require("./server/controllers/client/euro/american/american-controller");
var clientAustraliaController = require("./server/controllers/client/euro/australia/australia-controller");
var clientCanadaController = require("./server/controllers/client/euro/canada/canada-controller");
var clientContactController = require("./server/controllers/client/contact/contact-controller");
var clientClassKoreanController = require("./server/controllers/client/class/korean/korean-controller");


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
    function(username, password, done) {
        authencationController.login(username, password).then(function (response) {
            if (response != null && response.username) // stupid example
                return done(null, {name: "admin"});
            return done(null, false, { message: 'Incorrect username.' });
        });
    }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
//==================================================================


var app = express();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/tova");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('notsosecretkey'));
app.use(session({secret: 'notsosecretkey123'}));
app.use(flash());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization

// Set engine template
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/server/views');
app.set('view engine', 'html');
// end set engine template


app.use('/admin', express.static(__dirname + '/admin'));
app.use('/client', express.static(__dirname + '/client'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/public', express.static(__dirname + '/public'));

app.get('/dashboard', authencationController.checkLogin, function (req,res) {
    res.render('index', {token: req.flash('token')});
});

app.get('/login', function (req, res) {
   res.render('login');
});

// Authencation
app.post('/api/dashboard/user/signup', authencationController.signup);
app.post('/api/dashboard/user/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/dashboard');
});
app.post('/api/dashboard/user/logout', authencationController.logout);

// Japan
app.get('/api/dashboard/japan-study-aboard', authencationController.checkLogin, japanController.fetch);
app.post('/api/dashboard/japan-study-aboard/create', authencationController.checkLogin, uploadImage.any(), japanController.create);
app.post('/api/dashboard/japan-study-aboard/delete/:id', authencationController.checkLogin, japanController.delete);
app.post('/api/dashboard/japan-study-aboard/update', authencationController.checkLogin, uploadImage.any(), japanController.update);


// Korean
app.get('/api/dashboard/korean-study-aboard', authencationController.checkLogin, koreanController.fetch);
app.post('/api/dashboard/korean-study-aboard/create', authencationController.checkLogin, uploadImage.any(), koreanController.create);
app.post('/api/dashboard/korean-study-aboard/delete/:id', authencationController.checkLogin, koreanController.delete);
app.post('/api/dashboard/korean-study-aboard/update', authencationController.checkLogin, uploadImage.any(), koreanController.update);

// Germany
app.get('/api/dashboard/germany-study-aboard', authencationController.checkLogin, germanyController.fetch);
app.post('/api/dashboard/germany-study-aboard/create', authencationController.checkLogin, uploadImage.any(), germanyController.create);
app.post('/api/dashboard/germany-study-aboard/delete/:id', authencationController.checkLogin, germanyController.delete);
app.post('/api/dashboard/germany-study-aboard/update', authencationController.checkLogin, uploadImage.any(), germanyController.update);

// American
app.get('/api/dashboard/american-study-aboard', authencationController.checkLogin, americanController.fetch);
app.post('/api/dashboard/american-study-aboard/create', authencationController.checkLogin, uploadImage.any(), americanController.create);
app.post('/api/dashboard/american-study-aboard/delete/:id', authencationController.checkLogin, americanController.delete);
app.post('/api/dashboard/american-study-aboard/update', authencationController.checkLogin, uploadImage.any(), americanController.update);

// Australia
app.get('/api/dashboard/australia-study-aboard', authencationController.checkLogin, australiaController.fetch);
app.post('/api/dashboard/australia-study-aboard/create', authencationController.checkLogin, uploadImage.any(), australiaController.create);
app.post('/api/dashboard/australia-study-aboard/delete/:id', authencationController.checkLogin, australiaController.delete);
app.post('/api/dashboard/australia-study-aboard/update', authencationController.checkLogin, uploadImage.any(), australiaController.update);

// Canada
app.get('/api/dashboard/canada-study-aboard', authencationController.checkLogin, canadaController.fetch);
app.post('/api/dashboard/canada-study-aboard/create', authencationController.checkLogin, uploadImage.any(), canadaController.create);
app.post('/api/dashboard/canada-study-aboard/delete/:id', authencationController.checkLogin, canadaController.delete);
app.post('/api/dashboard/canada-study-aboard/update', authencationController.checkLogin, uploadImage.any(), canadaController.update);


// Contact
app.get('/api/dashboard/contact/email/fetch', authencationController.checkLogin, contactController.fetchEmail);
app.get('/api/dashboard/contact/email/fetch/:id', authencationController.checkLogin, contactController.fetchDetailEmail);
app.post('/api/dashboard/contact/email/delete/:id', authencationController.checkLogin, contactController.deleteEmail);
app.post('/api/dashboard/contact/email/reply/:id', authencationController.checkLogin, contactController.replyEmail);
app.get('/api/dashboard/contact/email/config', authencationController.checkLogin, contactController.fetchConfig);
app.post('/api/dashboard/contact/email/config', authencationController.checkLogin, contactController.updateConfig);

// Class Korean
app.get('/api/dashboard/class/korean', authencationController.checkLogin, classKoreanController.fetch);
app.post('/api/dashboard/class/korean/create', authencationController.checkLogin, uploadImage.any(), classKoreanController.create);
app.post('/api/dashboard/class/korean/delete/:id', authencationController.checkLogin, classKoreanController.delete);
app.post('/api/dashboard/class/korean/update', authencationController.checkLogin, uploadImage.any(), classKoreanController.update);


// Upload Images
require('./server/controllers/post-image-controller')(app);



// Client
app.get('/', function (req,res) {
    res.sendfile('server/views/client/index.html');
});

// Client Japan
app.get('/api/asian/japan', clientJapanController.fetch);
app.get('/api/asian/japan/detail/:id', clientJapanController.fetchDetail);
app.get('/api/asian/japan/fetch_most_view', clientJapanController.fetchMostView);
app.get('/api/asian/japan/fetch_correlative', clientJapanController.fetchCorrelative);

// Client Korean
app.get('/api/asian/korean', clientKoreanController.fetch);
app.get('/api/asian/korean/detail/:id', clientKoreanController.fetchDetail);
app.get('/api/asian/korean/fetch_most_view', clientKoreanController.fetchMostView);
app.get('/api/asian/korean/fetch_correlative', clientKoreanController.fetchCorrelative);

// Client Germany
app.get('/api/euro/germany', clientGermanyController.fetch);
app.get('/api/euro/germany/detail/:id', clientGermanyController.fetchDetail);
app.get('/api/euro/germany/fetch_most_view', clientGermanyController.fetchMostView);
app.get('/api/euro/germany/fetch_correlative', clientGermanyController.fetchCorrelative);

// Client American
app.get('/api/euro/american', clientAmericanController.fetch);
app.get('/api/euro/american/detail/:id', clientAmericanController.fetchDetail);
app.get('/api/euro/american/fetch_most_view', clientAmericanController.fetchMostView);
app.get('/api/euro/american/fetch_correlative', clientAmericanController.fetchCorrelative);

// Client Australia
app.get('/api/euro/australia', clientAustraliaController.fetch);
app.get('/api/euro/australia/detail/:id', clientAustraliaController.fetchDetail);
app.get('/api/euro/australia/fetch_most_view', clientAustraliaController.fetchMostView);
app.get('/api/euro/australia/fetch_correlative', clientAustraliaController.fetchCorrelative);

// Client Canada
app.get('/api/euro/canada', clientCanadaController.fetch);
app.get('/api/euro/canada/detail/:id', clientCanadaController.fetchDetail);
app.get('/api/euro/canada/fetch_most_view', clientCanadaController.fetchMostView);
app.get('/api/euro/canada/fetch_correlative', clientCanadaController.fetchCorrelative);

// Client Contact
app.post('/api/contact/send_mail', clientContactController.saveMail);

// Client Class Korean
app.get('/api/class/korean', clientClassKoreanController.fetch);
app.get('/api/class/korean/detail/:id', clientClassKoreanController.fetchDetail);
app.get('/api/class/korean/fetch_most_view', clientClassKoreanController.fetchMostView);

app.listen('3000', function () {
   console.log("server start ");
});
