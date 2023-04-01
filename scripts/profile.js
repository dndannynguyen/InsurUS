var currentUser;




function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userEmail = userDoc.data().email;
                    var userCity = userDoc.data().city;
                    var providerName = userDoc.data().providerName;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userCity != null) {
                        document.getElementById("providerInput").value = providerName;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}


function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }



function saveUserInfo() {
    //enter code here

    console.log("inside")

    //a) get user entered values
    var userName = document.getElementById("nameInput").value;
    var userEmail = document.getElementById("emailInput").value;
    var userCity = document.getElementById("cityInput").value;
    // get the original email value
    // var ogEmail = currentUser.get("email");
    // console.log(ogEmail);

    // check if the user has changed the email address
    
    console.log(userName, userEmail, userCity)

    // if (userEmail != ogEmail) {
    //     alert("You cannot change your email address!");
    // }
    
    //b) update user's document in Firestore
    currentUser.update({
        name: userName,
        
        city: userCity

    })
    
    .then(() => {
        console.log("Document successfully updated!");
        
    })
    
    //c) disable edit 
    document.getElementById('personalInfoFields').disabled = true;
    // location.reload();

}

function loadTotalRecords() {
        firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        var size = 0;
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentUser = user.uid
            //get the document for current user.
            db.collection("records")
            .where("userID", "==", currentUser)
            .onSnapshot(allRecords => {
                    //get the data fields of the user
                    records = allRecords.docs;
                    records.forEach(doc => {
                        size += 1
                        $("#countItems").text(size)
                    }
                    )
            })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }        
    });
    
}

$(document).ready(function () {
    populateUserInfo();
    loadTotalRecords()
    }
)

