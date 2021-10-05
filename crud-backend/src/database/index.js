const mongoose = require('mongoose');//Import lib

mongoose.Promiss = global.Promise;

//Connect with db
mongoose.connect('mongodb+srv://allantools:password1234@mycrud.2nrwz.mongodb.net/book?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.once('open', function() {
    console.log('Connection has been made');
}).on('error', function(error) {
    console.log('error is:', error);
});

module.exports = mongoose;