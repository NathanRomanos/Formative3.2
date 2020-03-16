console.log('working');

 let url;

 $.ajax({

		url :'config.json',
		type :'GET',
		dataType :'json',
		success : function(configData){
			console.log(configData);
			url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
		},
		error:function (){
			console.log('oops');
		}
});

 $(document).ready(function(){
//
// //get url and port from config.json
//   $.ajax({
//     url :'config.json',
//     type :'GET',
//     dataType :'json',
//     success : function(configData){
//       console.log(configData);
//       url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
//       console.log(url);
//     },//success
//     error:function(){
//       console.log('error: cannot call api');
//     }//error
//   }); //ajax
//
//
//
// //get allItem from products
//   $.ajax({
//     url : `${url}/allItems`,
//     type : 'GET',
//     dataType : 'json',
//     success : function(itemsFromMongo){
//       console.log(itemsFromMongo);
//     }, //success
//     error : function(){
//       console.log('error : cannot call api');
//     } //error
//   }); //ajax
//
//
//
//
// }) //document.ready



$('#sign-up-btn').click(function(){
    $('#sign-up-form').show();
    $('#log-in-container').hide();
});


$('#login-btn').click(function(){
    $('#log-in-container').show();
    $('#sign-up-form').hide();

});


// sign up form front end

$('#sign-up-form').submit(function(){

    event.preventDefault();
    let username = $('#r-username').val();
    let email = $('#r-email').val();
    let password = $('#r-password').val();

    console.log(username,email, password);

    if (username == ''){
      alert('please enter a user name');

      $('#r-username').attr('placeholder', 'Please enter a user name');
      $('#r-email').attr('placeholder', 'Please enter an email');
      $('#r-password').attr('placeholder', 'Please enter a password');


    }  else if (email == '') {
      alert('please enter an email');
      //not sure why email background box is poping up on this alert will I need to fix this
      //with background colour but when you enter password first it doesnt happen
      $('#r-username').attr('placeholder', 'Please enter a user name');
      $('#r-email').attr('placeholder', 'Please enter an email');
      $('#r-password').attr('placeholder', 'Please enter a password');
      $('.email-container').css('border', '2px solid red');


    }else if (password == '') {
      alert('enter a password');
      $('#r-username').attr('placeholder', 'Please enter a user name');
      $('#r-email').attr('placeholder', 'Please enter an email');
      $('#r-password').attr('placeholder', 'Please enter an email');

      // $('.password-container').css("box-shadow",'none');
      // $('.password-container').css('background','#FFA286');
      $('.email-container').css('border', '2px solid white');
      $('.password-container').css('border', '2px solid red');
      $('.password-container').css('color','white');

    }else {

    // activates the server side of things
    // showing error on line two of config.json file
    $.ajax({
      url :`${url}/signUp`,
      type :'POST',
      data:{
        username : username,
        email : email,
        password : password
        },
      success : function(user){
        console.log(user);
        if ((user == 'username taken already. Please try another one')) {
          // alert('please log in');
          $('#log-in-container').show();
          $('#sign-up-container').hide();
        } else {
          alert('username taken already. Please try another one');
          $('#r-username').val('');
          $('#r-email').val('');
          $('#r-password').val('');
        }
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
    });//ajax

  }//else
});//submit function for registerForm

  // end of sign up form

//log in

$('#log-in-form').submit(function(){
  event.preventDefault();

  let username = $('#username').val();
  let password = $('#password').val();

  console.log(username, password);

  if (username == '' || password == ''){
    alert('Please enter all details');
  } else {

  $.ajax({
    url :`${url}/loginUser`,
    type :'POST',
    data:{
      username : username,
      password : password
      },

    success : function(user){
      console.log(user);
      if (user == 'user not found. Please register'){
      alert('user not found. Please enter correct data or register a new user');

      } else if (user == 'not authorized'){
        alert('Please try with correct details');
        $('#username').val('');
        $('#password').val('');
      } else{

         $('#log-in-container').hide();
         $('#log-out-btn').show();
         // when shown after login/sign up forms colums of home-container display in one col
         $('#home-container').show();
        sessionStorage.setItem('userID', user['_id']);
        sessionStorage.setItem('userName',user['username']);
        sessionStorage.setItem('userEmail',user['email']);
        console.log(sessionStorage);
      }
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error
  });//ajax

}//else
});//submit function for login loginForm


// logout Btn
$('#log-out-btn').click(function(){
  console.log('You are logged out');
  sessionStorage.clear();
  $('#log-out-btn').hide();
  $('#sign-up-btn').show();
  console.log(sessionStorage);
});


// view users (all)

$('#viewUserBtn').click(function(){ // assign button
    $.ajax({
      url :`${url}/allUsers`,
      type :'GET',
      dataType :'json',
      success : function(displayUsers){
        console.log(displayUsers);
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
    });//ajax
});//viewUser button



$('.item-card-menu, .menu-close').hide();
// $('')
//Home page gallery
  $.ajax({
     url :`${url}/viewItem`,
     type :'GET',
     dataType :'json',
     success : function(viewData){
       console.log(viewData);
       document.getElementById('galleryResult').innerHTML = "";
       for (var i = 0; i < viewData.length; i++) {
         document.getElementById('galleryResult').innerHTML +=
        `<div class="item-card background-3">
          <div class="col">
            <img class="card-img-top" alt="item image should go here" src="${viewData[i].imgUrl}">
            <h2 class="item-card-title text-item">${viewData[i].name}</h2>
            <div class="photoShadow"></div>
          </div>
          <div class="item-card-text">
            <p>${viewData[i].description}</p>
            <p class="text-medium">By ${viewData[i].author}</p>
            <a class="item-card-link" href="${viewData[i].link}" target="_blank"><button class="btn-1" type="button" name="button">View website link</button></a>
          </div>
        </div> `;
       }

     },
     error:function (){
       console.log('oops');
     }
 }); //ajax ends

});//document ready function ends
