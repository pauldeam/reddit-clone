

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyARyBusf3MP8riqnEwO_07W1Rp7MGTIoJQ",
    authDomain: "authproj-bdc97.firebaseapp.com",
    databaseURL: "https://authproj-bdc97.firebaseio.com",
    projectId: "authproj-bdc97",
    storageBucket: "authproj-bdc97.appspot.com",
    messagingSenderId: "758486491303"
  };
  firebase.initializeApp(config);



// Get elements
const txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

//get text from html textbox in restrictedPage.html
const txtResetPass = document.getElementById('txtResetPass');

// login event
btnLogin.addEventListener('click', e=>{
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    
    console.log(email);
    
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
    
    authRedirect(); //get redirected to the restricted page
    
});
//signup event
btnSignUp.addEventListener('click', e=> {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
    
});


btnLogout.addEventListener('click', e=>{
    firebase.auth().signOut();
});



btnResetPass.addEventListener('click', e=> {
    
    // const email = txtEmail.value;
    const newpass = txtResetPass.value;
    // const pass = txtPassword.value;
    // const auth = firebase.auth();
    
    // const promise = auth.signInWithEmailAndPassword(email, pass);
    // promise.catch(e => console.log(e.message));
    
    var user = firebase.auth().currentUser;
    // var uid = user.uid;
    
    
    user.updatePassword(newpass);
    console.log("Password Reset");
    
});




//brings you back to home page
function authRedirectRestricted() {
        
        window.location="https://project3-paul225.c9users.io/AuthProj/public/index.html";
        firebase.auth().signOut();
        
}

//brings you back to home page
function authAddPost() {
        
        window.location="https://project3-paul225.c9users.io/AuthProj/public/addPostPage.html";
        
}

//after login, get redirected to the restricted page
    function authRedirect(){

        firebase.auth().onAuthStateChanged(firebaseUser=>{
            if(firebaseUser){
                //console.log(firebaseUser);
                var user = firebaseUser;
                console.log(user);
                window.location="https://project3-paul225.c9users.io/AuthProj/public/restrictedPage.html";
                
                
            }else{
                console.log('not logged in');
                
            }
        
        });
    }
    
    
    
    
    


   


