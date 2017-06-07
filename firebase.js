(function() {
// Initialize Firebase
    var config = {
    apiKey: "AIzaSyBKAe_FpRGNoCAqWf5fsbEmIzVTIfb65J0",
    authDomain: "fir-auth-4c01a.firebaseapp.com",
    databaseURL: "https://fir-auth-4c01a.firebaseio.com",
    projectId: "fir-auth-4c01a",
    storageBucket: "fir-auth-4c01a.appspot.com",
    messagingSenderId: "418955770967"
    };
    firebase.initializeApp(config);

  //Get Elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');
//  console.log(txtEmail, txtPassword);
  // Add login event
  btnLogin.addEventListener('click', e => {
    //Get email adn pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  // Add signup event
  btnSignUp.addEventListener('click', e => {
     // Get email adn pass
     // TODO: Check 4 Real Email
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

  });

  // Logout
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    // Check if the user exists
    if(firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');
    } else {
      console.log('not logged in');
      btnLogout.classList.add('hide');
    }
  });

}());
