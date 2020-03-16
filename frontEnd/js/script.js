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

//sign up

$('#signUpA').click(function(){ //assign button here and inputs below >>
		let username = $('#nameA').val();
		let email = $('#emailA').val();
		let password = $('#passA').val();
	$.ajax({
		url :`${url}/registerUser`,
		type :'POST',
		data :{
			username : username,
			email : email,
			password : password
		},
		success : function(login){
			console.log(login);
		},
		error:function (){
			console.log('oops');
		}
	});
});

//log in

$('#logIn').click(function(){
	event.preventDefault();
		let username = $('#username').val();
		let password = $('#password').val();
	$.ajax({
		url :`${url}/loginUser`,
		type :'POST',
		data :{
			username : username,
			password : password
		},
		success : function(login){
			console.log(login);
			if (login === 'not authorized') {
				alert('wrong password');
			} else if (login === 'user not found. Please register'){
				alert('wrong username');
			} else {
				sessionStorage.setItem('userId', login['_id']);
				sessionStorage.setItem('username', login['username']);
				// sessionStorage.setItem('email', login['email']);
				console.log(sessionStorage);
				// $('#logOut').css('display','block');
				// $('#logSignForm').css('display','none');
				// $('#editingForm').css('display','block');
			}
		},
		error:function (){
			console.log('oops');
		}
	});
});

//display user based on userID (sessionStorage) - profile page
$('#viewUserDetailsBtn').click(function(){
  //viewUserBtn changed to viewUserDetailsBtn
  $.ajax({
  url :`${url}/viewUser`,
  type :'GET',
  dataType :'json',
  success : function(viewUser){
    console.log(viewUser);
    document.getElementById('itemsCard').innerHTML = "";

    for(let i=0; i<viewUser.length; i++){

      if (sessionStorage['userId'] == viewUser[i]._id){
      console.log(viewUser[i]._id);
      document.getElementById('usernameProfile').value = `${viewUser[i].username}`
      document.getElementById('userEmailProfile').value = `${viewUser[i].email}`
      document.getElementById('userPasswordProfile').value = `${viewUser[i].password}`
      console.log(viewUser[i].username);
      console.log(viewUser[i].email);
      console.log(viewUser[i].password);
     } // for loop
   }
  },//success
  error:function(){
    console.log('error: cannot call api');
  }//error
  }); //ajax

}); //viewProduct button



// view item based on user ID(sessionStorage) - profile page
$('#viewItemProfile').click(function(){
  $.ajax({
  url :`${url}/viewItem`,
  type :'GET',
  dataType :'json',
  success : function(viewData){
    console.log(viewData);
    document.getElementById('itemsCard').innerHTML = "";

    for(let i=0; i<viewData.length; i++){

      if (sessionStorage['userId'] == viewData[i].user_id){
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


// retrieve user_id from sessionStorage and display on add new item form
$('#addItemBtn').click(function(){
  document.getElementById('addUserId').value =  sessionStorage['userId'];
});

// retrieve user_id from sessionStorage and display on edit user form
$('#editUserBtn').click(function(){
  document.getElementById('userIdEdit').value =  sessionStorage['userId'];
});


//update user (Edit User Form) - profile page
$('#updateUserBtn').click(function(){
  event.preventDefault();
  let  userId = $('#userIdEdit').val();
  let  username = $('#usernameEdit').val();
  let  email = $('#userEmailEdit').val();
  let  password = $('#userPasswordEdit').val();

  console.log(userId, username, email, password);

  if (username == '' || email == '' || password == ''){
    alert('Please enter all details');
  } else {

  $.ajax({
    url :`${url}/updateUser/${userId}`,
    type :'PATCH',
    data:{
      _id : userId,
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
      user_id : sessionStorage['userId']
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

$('#logOutBtn').click(function(){ //needs button to assign too here
				sessionStorage.clear();
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
        `<div class="home-card background-3">
          <div class="col">
            <img class="card-img-top" alt="item image should go here" src="${viewData[i].imgUrl}">
            <h2 class="home-item-title text-item">${viewData[i].name}</h2>
            <div class="photoShadow"></div>
          </div>
          <div class="home-item-text">
            <p>${viewData[i].description}</p>
            <p class="text-medium">By ${viewData[i].author}</p>
            <a class="home-item-link" href="${viewData[i].link}" target="_blank"><button class="btn-1" type="button" name="button">View website link</button></a>
          </div>
        </div> `;
       }

     },
     error:function (){
       console.log('oops');
     }
 }); //ajax ends



});//document ready function ends
