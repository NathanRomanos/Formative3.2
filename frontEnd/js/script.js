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
}); //ajax ends

 $(document).ready(function(){





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
  				// sessionStorage.setItem('userId', login['_id']);
  				// sessionStorage.setItem('username', login['username']);
  				// sessionStorage.setItem('email', login['email']);
  				console.log(sessionStorage);
  				// $('#logOut').css('display','block');
  				// $('#logSignForm').css('display','none');
  				// $('#editingForm').css('display','block');
  			}//else ends
  		},//login fucntion ends
  		error:function (){
  			console.log('oops');
  		}
  	}); //ajax ends
  }); //log in ends


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
         `<div class="home-card">
           <div class="home-item background-2">
             <img src="${viewData[i].imgUrl}" alt="image should go here">
             <p class="text-heading">${viewData[i].author}</p>
           </div>
           <div class="home-link background-1">
             <a href="${viewData[i].link}" target="_blank">Link to Website</a>
           </div>
         </div>`;
       }

     },
     error:function (){
       console.log('oops');
     }
 }); //ajax ends








});//document ready function ends
