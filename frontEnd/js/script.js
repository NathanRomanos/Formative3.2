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


$('#profileBtn').hide();
$('.profile-master-container').hide();
$('#view-users-btn').hide();

$('#profileBtn').click(function(){
  $('#galleryResult').hide();
  $('.profile-master-container').show();
});

$('#logo').click(function(){
  $('#galleryResult').show();
  $('.profile-master-container').hide();
});

$('#log-out-btn').click(function(){
  $('#galleryResult').show();
  $('.profile-master-container').hide();
  $('#login-btn').show();
  $('#profileBtn').hide();
})


$('#sign-up-btn').click(function(){
    $('#sign-up-form').show();
    $('#log-in-container').hide();
});

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
        if (!(user == 'username taken already. Please try another one')) {
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

  // start of log in form 

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

$('#login-btn').click(function(){
    $('#log-in-container').show();
    $('#sign-up-form').hide();

});

//display user based on userID (sessionStorage) - profile page
$('#profileBtn').click(function(){
  //viewUserBtn changed to viewUserDetailsBtn
  $.ajax({
  url :`${url}/displayUsers`,
  type :'GET',
  dataType :'json',
  success : function(viewUser){
    console.log(viewUser);
    // document.getElementById('itemsCard').innerHTML = "";

    for(let i=0; i<viewUser.length; i++){

      if (sessionStorage['userID'] == viewUser[i]._id){
      console.log(viewUser[i]._id);
      document.getElementById('usernameProfile').value = `${viewUser[i].username}`;
      document.getElementById('userEmailProfile').value = `${viewUser[i].email}`;
      document.getElementById('userPasswordProfile').value = `${viewUser[i].password}`;
      console.log(viewUser[i].username);
      console.log(viewUser[i].email);
      console.log(viewUser[i].password);
    } else {
      console.log('whoops');
    }
   }// for loop
  },//success
  error:function(){
    console.log('error: cannot call api');
  }//error
  }); //ajax

}); //viewProduct button



// view item based on user ID(sessionStorage) - profile page
$('#profileBtn').click(function(){
  $.ajax({
  url :`${url}/viewItem`,
  type :'GET',
  dataType :'json',
  success : function(viewData){
    console.log(viewData);
    document.getElementById('itemsCard').innerHTML = "";

    for(let i=0; i<viewData.length; i++){

      if (sessionStorage['userID'] == viewData[i].user_id){
      console.log(viewData[i].user_id);
      document.getElementById('itemsCard').innerHTML +=
      `<div class="item-card background-3">
          <div class="col">
            <img class="card-img-top" alt="item image should go here" src="${viewData[i].imgUrl}">
            <h2 class="item-card-title text-item">${viewData[i].name}</h2>
            <div class="item-card-options">
              <button id="" class="btn-1" type="button" name="button">Edit</button>
              <button id="" class="btn-1" type="button" name="button">Delete</button>
            </div>
            <div class="photoShadow"></div>
          </div>
          <div class="item-card-text">
            <p>${viewData[i].description}</p>
            <p class="text-medium">By ${viewData[i].author}</p>
            <a class="item-card-link" href="${viewData[i].link}" target="_blank"><button class="btn-1" type="button" name="button">View website link</button></a>
          </div>
        </div> `;
      }
    }
  },//success
  error:function(){
    console.log('error: cannot call api');
  }//error
  }); //ajax
}); //viewProduct button

//Pearly's code


   // retrieve user_id from sessionStorage and display on add new item form
$('#addItemBtn').click(function(){
  document.getElementById('addUserId').value =  sessionStorage['userID'];
});

// retrieve user_id from sessionStorage and display on edit user form
$('#editUserBtn').click(function(){
  document.getElementById('userIdEdit').value =  sessionStorage['userID'];
  console.log(sessionStorage['userID']);
});


//update user (Edit User Form) - profile page
$('#updateUserDetailsBtn').click(function(){
  event.preventDefault();
  let  userID = $('#userIdEdit').val();
  let  username = $('#usernameEdit').val();
  let  email = $('#userEmailEdit').val();
  let  password = $('#userPasswordEdit').val();

  console.log(userID, username, email, password);

  if (username == '' || email == '' || password == ''){
    alert('Please enter all details');
  } else {

  $.ajax({
    url :`${url}/updateUser/${userID}`,
    type :'PATCH',
    data:{
      _id : userID,
      username : username,
      email : email,
      password : password
      },
    success : function(data){
      console.log(data);
      alert('your profile has been updated!');
      $('#profileModal').hide();
      $('.modal-backdrop').hide();
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error

    });//ajax
  } //else
});//update user function for Edit User Form


// add new item (add new item form)- profile page
$('#submitAddItemBtn').click(function(){
  event.preventDefault();
  let name = $('#addItemName').val();
  let imageUrl = $('#addItemImgUrl').val();
  let author = $('#addItemAuthor').val();
  let description = $('#addItemDesc').val();
  let link = $('#addItemLink').val();
  let userId = $('#addUserId').val();

  console.log(name,imageUrl,author,description,link,userId);

  if (name == '' || imageUrl == '' || author == '' || description == '' || link == '' || userId == '' ){
    alert('Please enter all details');
  } else {

  $.ajax({
    url :`${url}/addItem`,
    type :'POST',
    data:{
      name : name,
      imgUrl : imageUrl,
      author : author,
      description : description,
      link : link,
      user_id : sessionStorage['userID']
      },

    success : function(item){
      console.log(item);
      if (!(item == 'Item is already in database. Please try again!')) {
      alert('added the project');
      $('#itemModal').hide();
      $('.modal-backdrop').hide();
      } else {
        alert('Item is already in database. Please try again!');

      }
      $('#addItemName').val('');
      $('#addItemImgUrl').val('');
      $('#addItemAuthor').val('');
      $('#addItemDesc').val('');
      $('#addItemLink').val('');


    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error

  });//ajax

}//else
});//add new item function


//log out button



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
      $('#r-password').attr('placeholder', 'Please enter a password');

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
        if (!(user == 'username taken already. Please try another one')) {
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
        $('#profileBtn').show();
        $('#sign-up-btn').hide();
        $('#login-btn').hide();
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

// $('#viewUserBtn').click(function(){ // assign button
//     $.ajax({
//       url :`${url}/allUsers`,
//       type :'GET',
//       dataType :'json',
//       success : function(displayUsers){
//         console.log(displayUsers);
//       },//success
//       error:function(){
//         console.log('error: cannot call api');
//       }//error
//     });//ajax
// });//viewUser button



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
