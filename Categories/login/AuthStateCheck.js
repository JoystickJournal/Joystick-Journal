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
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
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

  const AdvancedModalBody = document.querySelector('#advanced')

  firebase.auth().onAuthStateChanged(function(user) {
    if (user && !user.isAnonymous) {
        console.log('User is signed in.')
        const userWishlistRef = firebase.database().ref('wishlists/' + user.uid);
        console.log(user.uid)
        // Add event listener to parent element
        document.addEventListener('click', function(event) {
            // Check if target element is the Wishlist button
            console.log(event.target)
            if (event.target && event.target.matches('#Wishlist')) {
                const gameObj = {
                    title: AdvancedModalBody.querySelector('h2').textContent,
                    rating: AdvancedModalBody.querySelector('h5').textContent,
                    description: AdvancedModalBody.querySelector('p').textContent,
                    image: AdvancedModalBody.querySelector('img').src
                };
                userWishlistRef.child(gameObj.title).set(gameObj, function(error) {
                    if (error) {
                      console.log('Error:', error);
                    } else {
                      console.log('Game added to wishlist successfully!');
                    }
                })
                console.log('success')
        }
    });

        userWishlistRef.on('value', function(snapshot) {
            const wishlist = snapshot.val();
            console.log(wishlist)
            const wishlistItems = [];
            let count = 0
            for (const key in wishlist) {
                count++
                const gameObject = wishlist[key];
                const item = document.createElement('div');
                item.classList.add('wishlist-item');
                item.innerHTML = `
                <div class="card text-bg-dark">
  <img src="${gameObject.image}" class="card-img" alt="...">
  <div class="card-img-overlay">
    <h5 class="card-title">${gameObject.title}</h5>
    <div class="collapse" id="collapseExample${count}">
    <p class="card-text">${gameObject.description}</p>
    </div>
  </div>
</div>
<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${count}" aria-expanded="false" aria-controls="collapseExample">
Expand
</button>
                `;


                wishlistItems.push(item);
              }
              const wishlistContainer = document.querySelector('.offcanvas-body');
              wishlistContainer.innerHTML = '';
              wishlistItems.forEach(function(item) {
                wishlistContainer.appendChild(item);
              });
        });
    } else {
        console.log('User is signed out.')
        document.querySelector('#wishListButton').style.display = "none"
    }
});
