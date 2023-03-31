var currentUser

function saveHikeDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('hikeDocID', ID);
    window.location.href = 'FAQ.html';
}

function writeFaq() {
    console.log("inside write FAQ")
    let userEmail = document.getElementById("Email").value;
    let message = document.getElementById("Message").value;
    console.log(Email, Message);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("faq").add({
                        faqDocID: faqDocID,
                        email: Email,
                        message: Message,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "FAQ.html"; //new line added
                    })
                })
        } else {
            window.location.href = 'FAQ.html';
        }
    });
}
//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------