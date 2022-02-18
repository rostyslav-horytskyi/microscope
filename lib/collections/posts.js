Posts = new Mongo.Collection("posts");
Posts.allow({
  update: function (userId, post) {
    return ownsDocument(userId, post);
  },
  remove: function (userId, post) {
    return ownsDocument(userId, post);
  },
});
Meteor.methods({
  postInsert: function (postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      title: String,
      url: String,
    });
    const postWithSameLink = Posts.findOne({ url: postAttributes.url });
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id,
      };
    }
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
