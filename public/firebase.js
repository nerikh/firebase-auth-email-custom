import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCEtH-PthVEFV3XN1QRJRd0fssDYDmcDSA",
    authDomain: "goalcoach-37944.firebaseapp.com",
    databaseURL: "https://goalcoach-37944.firebaseio.com",
    projectId: "goalcoach-37944",
    storageBucket: "goalcoach-37944.appspot.com",
    messagingSenderId: "620577179534"
};
firebase.initializeApp(config);

export const firebaseApp = firebase.initializeApp(config);
// Specify Reference to Database by defining a new Constant
//  firebase. --set the database to the name we defined above in line 1 "firebase"
//  .database --call the database module
//  .ref('goals) --define the reference key named 'goals'
export const goalRef = firebase.database().ref('goals');
export const completeGoalRef = firebase.database().ref('completeGoals');
