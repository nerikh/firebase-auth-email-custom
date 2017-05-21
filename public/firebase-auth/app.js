(function() {
// Initialize Firebase
    var config = {
      apiKey: "AIzaSyD3rPxwJ6itkNklg1zoyxrPeoSFgdNDbI0",
      authDomain: "testme-b1756.firebaseapp.com",
      databaseURL: "https://testme-b1756.firebaseio.com",
      projectId: "testme-b1756",
      storageBucket: "testme-b1756.appspot.com",
      messagingSenderId: "631824635923"
    };
    firebase.initializeApp(config);

  //Get Elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');

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
/*
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
  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    // Check if the user exists
    if(firebaseUser) {
      console.log(firebaseUser);
    } else {
      console.log('not logged in');
    }
  });
*/
}());

