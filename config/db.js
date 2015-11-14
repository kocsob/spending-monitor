var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/spending-monitor');

module.exports = mongoose;
