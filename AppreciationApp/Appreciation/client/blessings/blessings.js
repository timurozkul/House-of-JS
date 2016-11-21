//
// Template.main.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });
//
// Template.main.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

Template.blessings.events({
  'click button'(e) {
    let newSubject = $('[name=subjectName]').val();
    alert(newSubject);
    Meteor.call()
  }
});
