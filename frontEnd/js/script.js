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
$('#viewUserBtn').click(function(){
  $.ajax({
  url :`${url}/viewUser`,
  type :'GET',
  dataType :'json',
  success : function(viewUser){
    console.log(viewUser);
    document.getElementById('itemsCard').innerHTML = "";

    for(let i=0; i<viewUser.length; i++){
      // if (viewUser[i]._id == '5e6c4d271bfa913e625cd5a0'){ //for testing
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
      // if (viewData[i].user_id == "5e6c4d271bfa913e625cd5a0"){  //for testing
      if (sessionStorage['userId'] == viewData[i].user_id){
      console.log(viewData[i].user_id);
      document.getElementById('itemsCard').innerHTML +=
      `<div class="col-sm-6 col-md-4 col-lg-3 pt-5">
        <div class="card" style="width: 18rem;">
          <img src="${viewData[i].imgUrl}" class="card-img-top" alt="image">
          <div class="card-body">
           <h3 class="card-title">${viewData[i].name}</h3>
            <h5 class="card-text">${viewData[i].author}</h5>
          </div>
          <div class="card-body">
            <p class="card-text">${viewData[i].description}</p>
            <a href="${viewData[i].link}" class="card-link target_blank">Link to Website</a>
          </div>
        </div>
      </div>`;
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


//update user (Edit User Form) - profile page (WAIT FOR ROY TO SETUP BACKEND)
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
      _id : userIdEdit,
      username : usernameEdit,
      email : userEmailEdit,
      password : userPasswordEdit
      },
    success : function(data){
      console.log(data);
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
      name : addItemName,
      imgUrl : addItemImgUrl,
      author : addItemAuthor,
      description : addItemDesc,
      link : addItemLink,
      user_id : sessionStorage['userId'],
      },

    success : function(item){
      console.log(item);
      if (!(item == 'Item is already in database. Please try again!')) {
      alert('added the project');
      } else {
        alert('Item is already in database. Please try again!');

      }
      $('#addItemName').val('');
      $('#addItemImgUrl').val('');
      $('#addItemAuthor').val('');
      $('#addItemDesc').val('');
      $('#addItemLink').val('');
      $('#addUserId').val('');

    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error

  });//ajax

}//else
});//add new item function
