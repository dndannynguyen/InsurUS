function addRecordDetails() {
    console.log("inside write review")
    let Name = document.getElementById("item_name").value;
    let Type = document.getElementById("item_type").value;
    let Brand = document.getElementById("item_brand").value;
    let Cost = document.getElementById("item_cost").value;
    let SerialNum = document.getElementById("item_serial_num").value;
    let Damaged = document.querySelector('input[name="item_damaged"]:checked').value;
    // let Photo = document.getElementById("item_photo");
    console.log(Name, Type, Brand, Cost, SerialNum, Damaged);
    // window.location.href = 'success.html';
    firebase.auth().onAuthStateChanged(user => {
    if (user) {
        var currentUser = db.collection("users").doc(user.uid)
        var userID = user.uid;
        //get the document for current user.
        currentUser.get()
            .then(userDoc => {
                var userEmail = userDoc.data().email;
                db.collection("records").add({
                    userID: userID,
                    name: Name,
                    type: Type,
                    brand: Brand,
                    cost: Cost,
                    damaged: Damaged,
                    serial_num: SerialNum,
                    // damaged: Damaged,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    window.location.href = "success.html"; //new line added
                })
            })
        } else {
            console.log("No user is signed in");
        }
    });
}
document.getElementById("submit_btn").onclick = addRecordDetails