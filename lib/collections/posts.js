Posts = new Mongo.Collection("posts");
Meteor.methods({
  postInsert: function (postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String,
    });
    const user = Meteor.user();
    const post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
    });
    const postId = Posts.insert(post);
    return {
      _id: postId,
    };
  },
});
