Posts = new Mongo.Collection("posts");

Posts.allow({
  update: function (userId, post) {
    return ownsDocument(userId, post);
  },
  remove: function (userId, post) {
    return ownsDocument(userId, post);
  },
});

Posts.deny({
  update: function (userId, post, fieldNames) {
    // may only edit the following two fields:
    return _.without(fieldNames, "url", "title").length > 0;
  },
});

Posts.deny({
  update: function (userId, post, fieldNames, modifier) {
    const errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  },
});

validatePost = function (post) {
  const errors = {};

  if (!post.title) errors.title = "Please fill in a headline";

  if (!post.url) errors.url = "Please fill in a URL";

  return errors;
};

Meteor.methods({
  postInsert: function (postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      title: String,
      url: String,
    });
    const errors = validatePost(postAttributes);
    if (errors.title || errors.url)
      throw new Meteor.Error(
        "invalid-post",
        "You must set a title and URL for your post"
      );
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
