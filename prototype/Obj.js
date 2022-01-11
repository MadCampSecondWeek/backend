const ObjectId = require('mongoose').Types.ObjectId

const Obj = {}

Obj.Post = function (title,content,board,author,school){
    this.title = title;
    this.content = content;
    this.board = ObjectId(board);
    this.author =ObjectId(author);
    this.school = school
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
Obj.LikeCommentFunc = function (commentid, userid){
    this.comment = ObjectId(commentid);
    this.user= ObjectId(userid);
}

Obj.Event = function(category,title,content,host,headCount,location,time,school){
    this.category = category;
    this.title = title;
    this.content = content;
    this.host = ObjectId(host);
    this.headCount = headCount;
    this.location = location;
    this.time = time;
    this.school = school;
}

Obj.EventComment = function(content,author,event,apply){
    this.apply = Number(apply);
    this.author = ObjectId(author);
    this.content = content;
    this.event = ObjectId(event);
}

Obj.ScrapEventFunc = function(eventid,userid){
    this.event = eventid;
    this.user = userid;
}

Obj.ALL = 0
Obj.SOCIALIZATION = 1
Obj.SPORT = 2
Obj.GAME = 3
Obj.DATE = 4
Obj.TRAVEL = 5
Obj.STUDY = 6

module.exports = Obj