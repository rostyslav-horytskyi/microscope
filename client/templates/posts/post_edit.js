Template.postEdit.events({
  "submit form": function (e) {
    e.preventDefault();
    const currentPostId = this._id;
    const postProperties = {
      url: $(e.target).find("[name=url]").val(),
      title: $(e.target).find("[name=title]").val(),
    };
    Posts.update(currentPostId, { $set: postProperties }, function (error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go("postPage", { _id: currentPostId });
      }
    });
  },
  "click .delete": function (e) {
    e.preventDefault();
    if (confirm("Delete this post?")) {
      const currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go("postsList");
    }
  },
});
