//Global variable pointing to the current user's Firestore document
var currentUser;   

//Function that calls everything needed for the main page  
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //global
            // console.log(currentUser);

            // figure out what day of the week it is today
            // const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
            // const d = new Date();
            // let day = weekday[d.getDay()];

            // the following functions are always called when someone is logged in
            // insertNameFromFirestore();
            displayCardsDynamically("providers");
        } else {
            // No user is signed in.
            console.log("No user is signed in");
            window.location.href = "login.html";
        }
    });
}
doAll();

// displays the quote based in input param string "tuesday", "monday", etc. 
function readQuote( day ) {
    db.collection( "quotes" ).doc( day ).onSnapshot( doc => {
        console.log("inside");
        console.log( doc.data() );
        document.getElementById( "quote-goes-here" ).innerHTML = doc.data().quote;
    } )
}
// Comment out the next line (we will call this function from doAll())
// readQuote("tuesday");       


// //-----------------------------------------------
// // Create a "max" number of provider document objects
// //-----------------------------------------------


//Generate different providers to firebase.
function writeProviderLoop(max) {
    //define a variable for the collection you want to create in Firestore to populate data
    var providersRef = db.collection("providers");
    for (i = 6; i <= max; i++) {
        providersRef.add({ //add to database, autogen ID
            code: "pic" + i,
            rating: Math.floor(Math.random() * 25) / 10 + 2.5 + " ★",
            name: "Provider " + i,
            details: "This provider is amazing. You will love Provider " + i,
            policy_number: Math.floor(Math.random() * 18001116),
            last_updated: firebase.firestore.FieldValue.serverTimestamp()
        })
   }
}


//Display the provider information in each card, and generate it for all providers.
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("providerCardTemplate");

    db.collection(collection)
        // .limit(3)
        .get() //the collection called "hikes"
        .then(allProviders => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allProviders.forEach(doc => { //iterate thru each doc
                var title = doc.data().name; // get value of the "name" key
                var details = doc.data().details; // get value of the "details" key
                var providerCode = doc.data().code; //get unique ID to each provider to be used for fetching right image
                var rating = doc.data().rating; //gets the rating field
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image etc.
                newcard.querySelector('.card-title').innerHTML = title;
                //newcard.querySelector('.card-length').innerHTML = providerLength + "km";
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${providerCode}.png`; //Example: NV01.jpg
                newcard.querySelector('a').href = "profile.html?docID=" + docID;

                //NEW LINE: update to display length, duration, last updated
                newcard.querySelector('.card-length').innerHTML =
                    "Rating: " + doc.data().rating + " <br>" +
                    "Last updated: " + doc.data().last_updated.toDate().toLocaleDateString();

                //NEW LINES: next 2 lines are new for demo#11
                //this line sets the id attribute for the <i> tag in the format of "save-hikdID" 
                //so later we know which provider to bookmark based on which provider was clicked
                newcard.querySelector('i').id = 'save-' + docID;
                // this line will call a function to save the providers to the user's document             
                newcard.querySelector('i').onclick = () => saveBookmark(docID);

                newcard.querySelector('b').id = 'register-' + docID;
                 // this line will call a function to save the providers to the user's document             
                newcard.querySelector('b').onclick = () => saveRegister(docID);


                currentUser.get().then(userDoc => {
                    //get the user name
                    var bookmarks = userDoc.data().bookmarks;
                    if (bookmarks.includes(docID)) {
                       document.getElementById('save-' + docID).innerText = 'favorite';
                    }
                })

                //Finally done modifying newcard
                //attach to gallery, Example: "providers-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}



// Register a provider and show it on the profile page. Before that, remove the previous provider.
function saveRegister(providerDocID) {
    // Get a reference to the user's document
    const userRef = firebase.firestore().collection('users').doc('userDoc');
  
    // Get a reference to the 'providers' subcollection for the user
    const providersRef = userRef.collection('providers');
  
    // Delete all documents in the 'providers' subcollection
    providersRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        providersRef.doc(doc.id).delete();
      });
    });
    
    // Add the new provider document to the 'providers' subcollection.
    currentUser.set({
        providers: [providerDocID]
      }, {
        merge: true
      })
      .then(function() {
        console.log("Provider has been saved for: " + currentUser);
        var iconID = 'register-' + providerDocID;
        document.getElementById(iconID).innerText = 'saveProvider';
      });
}



// Save the favorite icon for each provider.
function saveBookmark(providerDocID) {
    currentUser.get()
        .then(function(doc) {
            var bookmarks = doc.data().bookmarks;
            var bookmarkIndex = bookmarks.indexOf(providerDocID);
            if (bookmarkIndex > -1) {
                bookmarks.splice(bookmarkIndex, 1);
                currentUser.update({ bookmarks: bookmarks })
                    .then(function() {
                        console.log("Bookmark has been removed for: " + currentUser);
                        var iconID = 'save-' + providerDocID;
                        document.getElementById(iconID).innerText = 'favorite_border';
                    });
            } else {
                bookmarks.push(providerDocID);
                currentUser.update({ bookmarks: bookmarks })
                    .then(function() {
                        console.log("Bookmark has been saved for: " + currentUser);
                        var iconID = 'save-' + providerDocID;
                        document.getElementById(iconID).innerText = 'favorite';
                    });
            }
        })
}




//Alert to make sure user want to delete.
function confirmDelete() {
    if (confirm("Are you sure you want to delete this provider?")) {
      deleteRegister();
    

    }

  }


// Delete the registed provider.
function deleteRegister() {
    // Get a reference to the 'providers' subcollection for the current user
    const userRef = firebase.firestore().collection('users').doc('userDoc');


    currentUser.set({
        providers: []
      }, {
        merge: true
      }).then(() => {
        location.reload();
});
  }
