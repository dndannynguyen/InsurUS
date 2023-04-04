function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            // console.log(user.uid); //print the uid in the browser console
            // console.log(user.displayName);  //print the user name in the browser console

            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc=>{
                //get the user name
                var userName= userDoc.data().name;
                // console.log(userName);
                //$("#name-goes-here").text(userName); //jquery
                document.getElementById("name-goes-here").innerText=userName;
            })
        } 
    });
}


function displayRecordsDynamically(collection) {
    let cardTemplate = document.getElementById("Template");
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userID = user.uid;
            db.collection("records")
            .where("userID", "==", userID)
            .orderBy("timestamp", "desc")
            .limit(3)
            .onSnapshot(allRecords=> {
                
                allRecords.forEach(doc => { //iterate thru each doc
                    var type = doc.data().type;
                    var name = doc.data().name;
                    var cost = doc.data().cost;
                    var brand = doc.data().brand;
                    var docID = doc.id;
                    let newcard = cardTemplate.content.cloneNode(true);
                    
                    
                    //update title and text and image
                    newcard.querySelector('.card-title').innerHTML = name;
                    newcard.querySelector('.card-type').innerHTML = "Type: " + type;
                    newcard.querySelector('.card-cost').innerHTML = "Cost: " + cost;
                    newcard.querySelector('.card-brand').innerHTML = "Brand: " + brand;
                    newcard.querySelector('a').href = "eachItem.html?docID="+docID;
                    newcard.querySelector('.delete-record').setAttribute("id", docID)
                    //attach to gallery
                    document.getElementById(collection + "-go-here").appendChild(newcard);
                    
                })
            })
        }
    })
}


function deleteRecord(id) {
    swal("Are you sure you want to delete this record?", {
        buttons: [true, "Delete"]
    })
    $(".swal-button--confirm").click(function () {
        db.collection("records").doc(id).delete().then(() => {
            window.location.href = "main.html"; //new line added
        })
    })
}

function displayProvidersDynamically(collection) {
    let cardTemplate = document.getElementById("providerCardTemplate");

    db.collection(collection)
        .limit(3)
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
                    // var registration = userDoc.data().registration;
                    // if (registration.includes(docID)) {
                    // document.getElementById('register-' + docID).innerText = 'register';
                    // }
                })
                

                
                // currentUser.get().then(userDoc => {
                //     //get the user name
                   
                // })


                //Finally done modifying newcard
                //attach to gallery, Example: "providers-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

$(document).ready(function () {
    insertName() //run the function
    displayRecordsDynamically("records")
    displayProvidersDynamically("providers")
})