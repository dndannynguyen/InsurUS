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
function addObjects(max_objects) {
    //define a variable for the collection you want to create in Firestore to populate data
    var itemsRef = db.collection("stored_items");
    for (i = 1; i <= max_objects; i++) {
        itemsRef.add({
            name: "item number " + i,
            details: "This is an item the user added",
            lat: 49+i,
            lng: -122+i, 
            last_updated: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
}

addObjects(1);

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("itemsDisplayTemplate");

    db.collection(collection).get()   
        .then(allItems=> {
           
            allItems.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
                
                let newcard = cardTemplate.content.cloneNode(true);

                
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                
                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
}

displayCardsDynamically("records");  