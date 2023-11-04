const mongoose = require('mongoose');
// uri = "mongodb+srv://demouser002:test123@democluster.5yyxjzl.mongodb.net/?retryWrites=true&w=majority";
const connectDB = (uri) => {
    console.log("🚀 ~ file: connect.js:10 ~ connectDB ~ connectDB:")
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};
module.exports = connectDB;