Template.errors.helpers({
  errors: function () {
    return Errors.find();
  },
});
Template.error.onRendered(function () {
  const error = this.data;
  Meteor.setTimeout(function () {
    Errors.remove(error._id);
  }, 3000);
});
