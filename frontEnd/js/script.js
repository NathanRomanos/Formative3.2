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

//
// $(document).ready(function(){
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