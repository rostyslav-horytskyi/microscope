Posts = new Mongo.Collection("posts");
Meteor.methods({
  postInsert: function (postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      title: String,
      url: String,
    });
    if (Meteor.isServer) {
      postAttributes.title += "(server)";
      // wait for 5 seconds
      Meteor._sleepForMs(5000);
    } else {
      postAttributes.title += "(client)";
    }
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
