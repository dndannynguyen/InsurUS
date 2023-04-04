function addRecordDetails() {
    // writes the added record to firebase
    let Name = document.getElementById("item_name").value;
    let Type = document.getElementById("item_type").value;
    let Brand = document.getElementById("item_brand").value;
    let Cost = document.getElementById("item_cost").value;
    let SerialNum = document.getElementById("item_serial_num").value;
    let Damaged = document.querySelector('input[name="item_damaged"]:checked').value;
    firebase.auth().onAuthStateChanged(user => {
    if (user) {
        var currentUser = db.collection("users").doc(user.uid)
        var userID = user.uid;
        currentUser.get()
            .then(userDoc => {
                var userEmail = userDoc.data().email;
                db.collection("records").add({
                    userID: userID,
                    name: Name,
                    type: Type,
                    brand: Brand,
                    cost: parseFloat(Cost),
                    damaged: Damaged,
                    serial_num: SerialNum,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    swal("Record added successfully!", {
                        button: "See Records"
                    })
                    $(".swal-button--confirm").click(function () {
                        window.location.href = "records.html";
                    })
                })
            })
        } else {
            console.log("No user is signed in");
        }
    });
}
document.getElementById("submit_btn").onclick = addRecordDetails