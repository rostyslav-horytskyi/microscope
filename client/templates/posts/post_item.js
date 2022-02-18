Template.postItem.helpers({
  ownPost: function () {
    return this.userId === Meteor.userId();
  },
  domain: function () {
    const a = document.createElement("a");
    a.href = this.url;
    return a.hostname;
  },
});
