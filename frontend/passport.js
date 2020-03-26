const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./key');
const customers = require("./src/strapi/customers/customers");
passport.serializeUser((user, done) => {
    console.log("serializeUser", user);
    done(null, user.customer_id);
});

passport.deserializeUser(async (id, done) => {
    const user = await customers.get(id);
    console.log("deserializeUser", id, user);
    done(null, user);
});
passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, async (token, tokenSecret, profile, done) => {
            if (profile.id) {
                console.log("profile.id", profile.id);
                let user = await customers.get(profile.id);
                if (user.customer_id) {
                    console.log("found",user.customer_id);
                    done(null, user);
                } else {
                    console.log("not found",profile.id);
                    user = await customers.create(profile);
                    done(null, user);
                }
            }
        }
    )
);