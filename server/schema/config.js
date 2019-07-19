const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb+srv://admin:adminPass@cluster0-uvkfp.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));