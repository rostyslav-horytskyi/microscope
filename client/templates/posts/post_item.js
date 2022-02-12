Template.postItem.helpers({
  domain: function () {
    const link = document.createElement("a");
    link.href = this.url;
    return link.hostname;
  },
});
