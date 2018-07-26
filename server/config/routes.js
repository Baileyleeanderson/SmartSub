const mongoose = require('mongoose'),
    User = mongoose.model('User');
var users = require('../controllers/users.js');
var path = require("path")
module.exports = function(app){

    app.get('/api/user', users.finduser);
    app.get('/api/userid/:id', users.finduserId);
    app.get('/api/videos/', users.findVideos);
    app.get('/api/verify/:id', users.verify);
    app.get('/api/sub_info/:id', users.subInfo);
    app.get('/api/sub_verify', users.subVerify);
    app.put('/api/unsubscribe/:id', users.unsubscribe);
    app.post('/api/user', users.register);
    app.post('/api/login', users.login);
    app.post('/api/change_photo', users.changePhoto);
    app.post('/api/create_bio', users.createBio);
    app.post('/api/video_upload', users.uploadVideo);
    app.post('/api/subscribe/:vid', users.subscribeVideo);
    app.delete('/api/delete/:id',users.deleteVideo);
    app.delete('/api/logout', users.logout)
}