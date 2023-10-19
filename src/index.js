// server.js

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const connectToDatabase = require('./config/db');
const configurePassport = require('./config/passport');
const authRoutes = require('./routes/auth');
const routes = require('./routes');
const authCheckMiddleware = require('./middlewares/authCheck');

dotenv.config();
const uri = process.env.DB_CONNECT;
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('./server/static/'));
app.use(bodyParser.json());

// Database connection
connectToDatabase(uri);

// Passport configuration
configurePassport(app);

app.use('/api', authCheckMiddleware, routes);
app.use('/auth', authRoutes);

app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'), () => console.log(`Server is running on port ${app.get('port')}`));
