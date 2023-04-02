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

}

$(document).ready(
    $("#submitBTN").click(writeQuestion)
)