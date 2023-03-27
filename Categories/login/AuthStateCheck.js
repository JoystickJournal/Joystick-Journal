const firebaseConfig = {
    apiKey: configGOOGLE.apiKey,
    authDomain: configGOOGLE.authDomain,
    databaseURL: configGOOGLE.databaseURL,
    projectId: configGOOGLE.projectId,
    storageBucket: configGOOGLE.storageBucket,
    messagingSenderId: configGOOGLE.messagingSenderId,
    appId: configGOOGLE.appId,
    measurementId: configGOOGLE.measurementId
  };

  firebase.initializeApp(firebaseConfig);

  var uiConfig = {
    signInSuccessUrl: '../top-games.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign('<your-privacy-policy-url>');
    }
  };



  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);


  let userState

firebase.auth().onAuthStateChanged(function(user) {
    if (user && !user.isAnonymous) {
      console.log('User is signed in.')
      userState = firebase.auth().currentUser.uid
      console.log(userState)
      const userWishlistRef = firebase.database().ref('wishlists/' + userState);
      console.log(userWishlistRef)
      userWishlistRef.child(4298).set(true)
      userWishlistRef.on('value', function(snapshot) {
        // This function will be called whenever the wishlist data changes
        const wishlist = snapshot.val();
        // Do something with the wishlist data
        console.log(wishlist)
      });
    //   document.getElementById('authenticated-content').style.display = 'block';
    } else {
      console.log('User is signed out.')
    //   document.getElementById('authenticated-content').style.display = 'none';
    }
  });



  const database = firebase.database();

  const gameData = {
    title: "The Witcher 3: Wild Hunt",
    platform: "PC",
    releaseYear: 2015
  };

const userId = firebase.auth().currentUser.uid;
const wishlistRef = database.ref('users/' + userId + '/wishlist');

if (user && user.uid) {
  const uid = user.uid;
  // rest of the code that depends on uid
} else {
  console.log("User is not logged in.");
}

wishlistRef.on('value', (snapshot) => {
  const wishlistData = snapshot.val();
  console.log(wishlistData);
});