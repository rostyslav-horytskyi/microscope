Comments = new Mongo.Collection("comments");
Meteor.methods({
  commentInsert: function (commentAttributes) {
    //...
    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
    });
    // update the post with the number of comments
    Posts.update(comment.postId, { $inc: { commentsCount: 1 } });
    // create the comment, save the id
    comment._id = Comments.insert(comment);
    // now create a notification, informing the user that there's been a commen
    t;
    createCommentNotification(comment);
    return comment._id;
  },
});
