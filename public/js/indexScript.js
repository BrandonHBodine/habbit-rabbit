function main(){
  'use strict';
  $( document ).ready(function() {

    $('#signinBtn').click(function(event){
      $('.signin').css({display: 'block'});
      $('#signupBtn').css({display: 'none'});
      $('#cancelSignin').css({display: 'block'});
      $('#postSigninBtn').css({display: 'block'});
      $('#signinBtn').css({display: 'none'});
    });

    $('#signupBtn').click(function(event){
      $('#signinBtn').css({display: 'none'});
      $('#signupBtn').css({display: 'none'});
      $('.signup').css({display: 'block'});
      $('#cancelSignup').css({display: 'block'});
    });

    $('#submit').click(function(event){
      $('.signin').css({display: 'none'});
      $('.signup').css({display: 'none'});
      $('.successMessage').css({display: 'block'});
    });

    $('#cancelSignup').click(function(event){
      $('#signinBtn').css({display: 'block'});
      $('#signupBtn').css({display: 'block'});
      $('.signin').css({display: 'none'});
      $('.signup').css({display: 'none'});
      $('.#cancelSignup').css({display: 'none'});
    });

    $('#cancelSignin').click(function(event){
      $('#signinBtn').css({display: 'block'});
      $('#signupBtn').css({display: 'block'});
      $('.signin').css({display: 'none'});
      $('.signup').css({display: 'none'});
      $('#cancelSignin').css({display: 'none'});
      $('#postSigninBtn').css({display: 'none'});
    });

    $('.btn-default').click(function(event){
      var currentButton = event.target;
      $(currentButton).siblings('.active').removeClass('active');
      if ($(currentButton).hasClass('active') === true) {
        $(currentButton).removeClass('active');
      } else {
        $(currentButton).addClass('active');
      }

    });

  });
}
main();
