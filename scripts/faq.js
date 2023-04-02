function writeQuestion() {
    // writes the user's question to the database
    let userEmail = $("#Email").val();
    let Question = $("#Question").val();
    db.collection("faq").add({
        email: userEmail,
        question: Question,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        swal("Your question has been recorded and will be answered within 5 business days!")
    })

<<<<<<< HEAD
function savefaqDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('faqDocID', ID);
    window.location.href = 'FAQ.html';
}

function writeFaq() {
    console.log("inside write FAQ")
    let userEmail = document.getElementById("email").value;
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
=======
}

$(document).ready(
    $("#submitBTN").click(writeQuestion)
)
>>>>>>> eba929cbe0bcbf03016e622667e67ba30717a824
