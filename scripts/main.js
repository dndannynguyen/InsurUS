function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console

            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc=>{
                //get the user name
                var userName= userDoc.data().name;
                console.log(userName);
                //$("#name-goes-here").text(userName); //jquery
                document.getElementById("name-goes-here").innerText=userName;
            })
        } 
    });
}

insertName(); //run the function


//-----------------------------------------------
// Create a "max" number of objects
//-----------------------------------------------
// function addObjects(max_objects) {

//     var itemsRef = db.collection("stored_items");
//     for (i = 1; i <= max_objects; i++) {
//         itemsRef.add({
//             name: "item number " + i,
//             details: "This is an item the user added",
//             lat: 49+i,
//             lng: -122+i, 
//             last_updated: firebase.firestore.FieldValue.serverTimestamp()
//         })
//     }
// }



//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------

function displayRecordsDynamically(collection) {
    let cardTemplate = document.getElementById("itemsDisplayTemplate");

    db.collection(collection).get()   //the collection records"
        .then(allRecords=> {
            
            allRecords.forEach(doc => { //iterate thru each doc
                var type = doc.data().type;
                var name = doc.data().name;
                var cost = doc.data().cost;
                var brand = doc.data().brand;
               
                let newcard = cardTemplate.content.cloneNode(true);


                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = name;
                newcard.querySelector('.card-type').innerHTML = type;
                newcard.querySelector('.card-cost').innerHTML = cost;
                newcard.querySelector('.card-brand').innerHTML = brand;
               
                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);

            })
        })
}

displayRecordsDynamically("records");  