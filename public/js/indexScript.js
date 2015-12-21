function main(){
  'use strict';
  $( document ).ready(function() {

    $('#signinBtn').click(function(event){
      $('.signin').css({display: 'block'});
      $('.signup').css({display: 'none'});
    });

    $('#signupBtn').click(function(event){
      $('.signin').css({display: 'none'});
      $('.signup').css({display: 'block'});
    });

    $('#submit').click(function(event){
      $('.signin').css({display: 'none'});
      $('.signup').css({display: 'none'});
      $('.successMessage').css({display: 'block'});
    });

  });
}
main();
