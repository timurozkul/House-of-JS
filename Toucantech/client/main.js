Template.main.events({
  'click #submit'(e){
    e.preventDefault();
    let selectedSchools = getSchools();

    let user = {
      name: $('[name=name]').val().trim(),
      email: $('[name=email]').val().trim(),
      school: selectedSchools
    };

    if(nameVal(user.name) && emailVal(user.email)) {
    
    // Server side method call with the argument user obj
    Meteor.call('addUser', user, (err) => {
      if (err) {
        toastr.error(err.reason);
      } else {
        toastr.success("User created");
        emptyFields();
      }
    });
  }
  },
  
  'click form .school'(e){
    let className = e.currentTarget.className;
    
    if(className.indexOf("active") === -1) {
      $(e.target).addClass("active");
    } else {
      $(e.target).removeClass("active");
    }
  },
  
  'click .school__info .school'(e){
    let className = e.currentTarget.className;
    $(e.target).siblings().removeClass('active');
    $(e.target).addClass("active");
    
    // Similar to a global variable stored as a cookie
    Session.set('currentSchool');
    Session.set('currentSchool', e.currentTarget.innerHTML);
  }
});


function emptyFields(){
  $('[name=name]').val('');
  $('[name=email]').val('');
  $('.form__wrapper').find("*").each( (index, element) => {
    $(element).removeClass('active');
  });
}

function getSchools(){
  let school = $('.school');
  let elements = $('form').find(school);
  let selectedSchools = [];
  $.each(elements, (index, element) => {
      if(element.className.indexOf("active") !== -1)
      selectedSchools.push(element.innerHTML);
  });
  return selectedSchools;
}

function nameVal(name){
  let re = /^[a-zA-Z ]*$/;
  if (name) {
    if (re.test(name) == true) {
      return true;
    } else {
      toastr.error("Please enter a valid name");
    }
  } else {
    toastr.error("Please enter your name");
    return false;
  }
}

function emailVal(email){
  let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (email) {
    if (re.test(email) == true) {
      return true;
    } else {
      toastr.error("Please enter a correct email address");
    }
  } else {
    toastr.error("Please enter your email address");
    return false;
  }
}