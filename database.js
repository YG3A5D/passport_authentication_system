const mongoose = require('mongoose');
exports.connectMongoose = () => {

    mongoose
    .connect('mongodb://localhost:27017/passport') // Providing URL of MongoDB Server
    .then(e => console.log(`Connected to MongoDB:'${e.connection.host}`)) // Initiating the Connection with database
    .catch((e) => console.log(e)); 
};


// Designing the schema of our passport database
const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: String,

});

exports.User = mongoose.model("User", userSchema);
