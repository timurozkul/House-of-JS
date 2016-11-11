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

Template.main.events({
  'click button'(e) {
    let newSubject = $('[name=subjectName]').val();
    
    Meteor.call()
  }
});
