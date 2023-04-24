const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./database');

// We are going to use passport local strategy
exports.initializingPassport = (passport) => {
    passport.use(
        new LocalStrategy(async(username, password, done) => {
    try {
            const user = await User.findOne({username});
            if(!user) return done(null,false); // IF NO USER EXISTS
        
            if (user.password !== password) return done(null, false);

            return done(null, user);
    }   
    catch (error){
            return done(error, false);
    }}
 ))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
 });
};