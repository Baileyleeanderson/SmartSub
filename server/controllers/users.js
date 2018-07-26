var mongoose = require('mongoose');
let User = mongoose.model('User');
const bcrypt = require('bcrypt-as-promised');


module.exports = {

    register: (req, res) =>{
        var all_errors = []
        var conf = req.body.pwconf;
        var pw = req.body.password;
        console.log('username', req.body.username)
        console.log('pw', pw)
        if(pw == ''){
            all_errors.push("Please Enter Password");
           return res.json({errors: all_errors})
        }
        if(conf != req.body.password){
            all_errors.push("Passwords do not Match");
            return res.json({errors: all_errors});
           
        }
        bcrypt.hash(req.body.password, 10).then(hashed => {	 
            var newuser = new User({email: req.body.email, username: req.body.username,bio: req.body.bio, password: hashed})
            
            newuser.save((err, user) => {
            if(err){
                for(var key in err.errors){
                    all_errors.push(err.errors[key].message);
                }
                console.log({errors: all_errors})
                return res.json({errors: all_errors})
            }
            else{
                newuser.save;
                var id = user._id;
                console.log('id', id)
                req.session.uid = id;
                console.log('sess',req.session.uid)
                res.json({user: user});
                }
            });
        });
    },

    login: (req, res) => { 
        var email = req.body.email;
        var pw = req.body.password;
        console.log("pw",pw)
        var all_errors = [];
        if(email == "" || pw == ""){
          all_errors.push('All fields must be filled out');
          return res.json({errors: all_errors})
        }

        User.find({email: email},(err, user) => {
            console.log('user',user)
          if(user.length < 1){
              console.log('no user')
              all_errors.push("Invalid Information");
              return res.json({errors:all_errors})
          }
          else{
            var hash = user[0].password;
            console.log('user',user[0].password)
            if(user[0] == null) {
                all_errors.push('Invalid Information');
                return res.json({errors: all_errors});
            }
            else{
                bcrypt.compare(pw, hash)
                .then(result =>{
                    console.log(user[0]._id,'result')
                    var id =  user[0]._id;
                    req.session.uid = id;
                    console.log('sess', req.session.uid)
                    return res.json({user:result})
                })
                .catch(errors => {
                    console.log('errors',errors)
                    all_errors.push('Invalid Information')
                    return res.json({errors: all_errors})
                });
            };
        }});
    },
    
    finduser: (req,res)=>{
        if(!req.session.uid){
            var errors = ["No Session Id"];
            return res.json({errors: errors})
        }
        console.log('finduser', req.session.uid)
        User.findOne({_id: req.session.uid}, (err, user)=>{
            if(err){
                console.log(err);
            }
            else{
                return res.json({user:user});
            }
        });
    },

    finduserId: (req,res)=>{
        if(!req.session.uid){
            var errors = ["No Session Id"];
            return res.json({errors: errors})
        }
        console.log('finduser', req.session.uid)
        User.findOne({_id: req.params.id}, (err, user)=>{
            if(err){
                console.log(err);
            }
            else{
                return res.json({user:user});
            }
        });
    },

    changePhoto: (req,res)=>{
        console.log('changephoto', req.session.uid)
        User.findOne({_id: req.session.uid}, (err, user)=>{
            console.log('found one', user)
            if(err){
                console.log("err");
            }
            else{
                user.profile = req.body.img;
                user.save(err=>{
                    if(err){
                        console.log("err");
                    }
                    else{
                        res.json({user:user});
                    }
                });
            };
        });
        
    },

    createBio: (req,res)=>{
        console.log('controllers', req.body.bio)
        User.findOne({_id: req.session.uid}, (err, user)=>{
            if(err){
                console.log(err);
            }
            else{
                user.bio = req.body.bio;
                user.save(err=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("created", user)
                        res.json({user:user})
                    }
                })
            }
        })
    },

    uploadVideo: (req,res)=>{
        var video = req.body.url;
        var i = video.length;
        var count = 11;
        i = i - count;
        var address = video.slice(i);
        var real_address = "https://www.youtube.com/embed/"+address;

        User.findOneAndUpdate({_id: req.session.uid},{$push: {videos:{title:req.body.title, url: real_address, creator:req.session.uid, desc:req.body.desc, category:req.body.category}}}, (err,user)=>{
        user.save(err=>{
            if(err){
                console.log(err)
            }
            else{
                res.json({user:user})
            }
        });
        });      
    },

    findVideos: (req, res)=>{
        console.log('findvideos');
        User.find({}, (err,users)=>{
            if(err){
                console.log(err)
            }
            else{
                res.json({users:users})
            }
        })
    },

    verify: (req,res)=>{
        if(req.params.id != req.session.uid){
            User.findOne({_id: req.params.id},(err,user)=>{
                if(err){
                    console.log(err)
                }
                else{
                    res.json({user:user})
                }
            })
        }
        else{
            let success = "Users page";
            res.json({success:success})
        }
    },

    deleteVideo: (req,res)=>{
        console.log('delte cont',req.params.id)
        User.findOneAndUpdate({_id:req.session.uid},{$pull: {'videos': {_id: req.params.id}}},(err,user)=>{
            if(err){
                console.log(err)
            }
            else{
                res.json({user:user})
            }  
        })
    },

    subscribeVideo: (req,res)=>{
        console.log('vid',req.params.vid)
        User.findOneAndUpdate({_id: req.session.uid},{$push: {subscribed_to: {user_id: req.params.vid}}},(err,user)=>{
            user.save(err=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log('user',{user:user})
                    res.json({user:user})
                }
            })
        })
    },
    subInfo: (req,res)=>{
        User.findOne({_id: req.params.id},(err,user)=>{
            if(err){
                console.log(err)
            }
            else{
                res.json({user:user})
            }
        })
    },
    subVerify: (req,res)=>{
        User.findOne({_id:req.session.uid},(err,user)=>{
            if(err){
                console.log(err)
            }
            else{
                res.json({user:user})
            }
        })
    },
    logout: (req, res)=>{
        req.session.destroy();
        res.json({destroyed: true})
    },
    unsubscribe: (req, res)=>{
        User.findOneAndUpdate({_id: req.session.uid}, {$pull: {subscribed_to: {user_id: req.params.id}}},(err, user)=>{
            if(err){
                console.log(err)
            }
            else{
                res.json({user:user})
            }
        })
    }
}
