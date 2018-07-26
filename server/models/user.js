const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: {type: String, required: [true, "Please enter email"], minlength: [3, "Email must be valid email"]},
    username: {type: String, required: [true, "Please enter username"], minlength: [3, "Username must be longer than 3 characters"]},
    password: {type: String, required: [true, "Please enter password"]},
    bio: {type: String, default: ""},
    videos: [{
        title: String,
        url: String,
        category: String,
        desc: String,
        creator: String
    }],
    subscribers: [{
        user_id: {type: String}
    }],
    subscribed_to: [{
        user_id: {type: String}
    }],
    profile: {type: String, default: "https://cdn.iconscout.com/public/images/icon/premium/png-512/user-avatar-profile-accout-login-dashboard-3d18074f1ffe5632-512x512.png"},
});
userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); 
 }, 'Please enter a valid email')
mongoose.model('User', userSchema);