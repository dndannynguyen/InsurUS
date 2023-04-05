function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc=>{
                //get the user name
                var userName= userDoc.data().name;
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
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image etc.
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${providerCode}.png`; //Example: NV01.jpg
                newcard.querySelector('a').href = "provider.html";

                //NEW LINE: update to display length, duration, last updated
                newcard.querySelector('.card-length').innerHTML =
                    "Rating: " + rating + " <br>" +
                    "Last updated: " + doc.data().last_updated.toDate().toLocaleDateString();

                document.getElementById(collection + "-go-here").appendChild(newcard);

            })
        })
}

$(document).ready(function () {
    insertName() //run the function
    displayRecordsDynamically("records")
    displayProvidersDynamically("providers")
})