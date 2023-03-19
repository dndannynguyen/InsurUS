var itemDocID = localStorage.getItem("itemDocID");    //visible to all functions on this page

function getItemName(id) {
    db.collection("records")
      .doc(id)
      .get()
      .then((thisItem) => {
        var itemName = thisItem.data().name;
        document.getElementById("itemName").innerHTML = itemName;
          });
}

getItemName(itemDocID);

function updateReview() {
    console.log("updating the review")
    let Brand = document.getElementById("brand").value;
    let Cost = document.getElementById("cost").value;
    let Serial_Num = document.getElementById("serial_num").value;
    let Timestamp = document.getElementById("timestamp").value;
    
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("records").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("records").add({
                        hikeDocID: hikeDocID,
                        userID: userID,
                        title: Title,
                        level: Level,
                        season: Season,
                        description: Description,
                        flooded: Flooded,
                        scrambled: Scrambled,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "thanks.html"; //new line added
                    })
                })
        } else {
            console.log("No user is signed in");
            window.location.href = 'review.html';
        }
    });
}