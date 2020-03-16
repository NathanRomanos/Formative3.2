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
