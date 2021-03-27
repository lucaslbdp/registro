const usersCrtl = {};
const User = require("../models/User")

usersCrtl.renderSignUpForm = (req, res) => {
    res.render("users/signup")
}

usersCrtl.signUp = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: "Passwords do not match" });
    }
    if (password.length < 4) {
        errors.push({ text: "Passwords must be at least 4 characters" });
    }
    if (errors.length > 0) {
        res.render("users/signup", {
            errors,
            name,
            email
        })
    } else {
        const emailUser = await User.findOne({email: email})
        if(emailUser){
            req.flash("error_msg", "The email is already in use");
            res.redirect("/users/signup");
        }else{
           const newUser = new User({name, email, password});
           newUser.password = await newUser.encryptPassword(password)
           await newUser.save();
           req.flash("success_msg", "You are registered");
           res.redirect("/users/signin");
        }
    }
};

usersCrtl.renderSignInForm = (req, res) => {
    res.render("users/signin")
}


usersCrtl.signIn = (req, res) => {
    res.sen("signin")
}


usersCrtl.logOut = (req, res) => {
    res.send("logout")
}


module.exports = usersCrtl;