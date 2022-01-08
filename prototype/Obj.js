const ObjectId = require('mongoose').Types.ObjectId

const Obj = {}

Obj.Post = function (title,content,board,author){
    this.title = title;
    this.content = content;
    this.board = ObjectId(board);
    this.author =ObjectId(author);
}
Obj.User = function(school){
    this.school = school;
}


Obj.Comment = function (content,author,post){ //for new post
    this.content = content;
    this.author =ObjectId(author);
    this.post= ObjectId(post);
}

Obj.Board = function(title,school){
    this.title = title;
    this.school = school;
}


Obj.LikePostFunc = function (postid, userid){
    this.post = ObjectId(postid);
    this.user= ObjectId(userid);
}

module.exports = Obj