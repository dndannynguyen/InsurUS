var currentUser;

function insertUserEmail() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // go to the user document
            currentUser = db.collection("users").doc(user.uid)

            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayUserEmail);  //print the user name in the browser console
            //user_Email = user.displayUserEmail;
            currentUser.get().then(userDoc => {
                var userName = userDoc.data().name;
                var userEmail = userDoc.data().email;

                if (userName != null) {
                    document.getElementById("nameInput").value = userName;
                }
                if (userEmail != null) {
                    document.getElementById("emailInput").value = userEmail;
                }
            })
            //method #1:  insert with html only
            //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
            //method #2:  insert using jquery
            //$("#userEmail").text(user_Email); //using jquery

        } else {
            // No user is signed in.
            console.log("No user is signed in at the moment")
        }
    });
}
insertUserEmail(); //run the function

function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {

    // get user entered values
    var userName = document.getElementById("nameInput").value;
    var userEmail = document.getElementById("emailInput").value;

    // update user's document in Firestore
    currentUser.update({
        name: userName,
        email: userEmail,
    })
        .then(() => {
            console.log("User information is updated");
        })

    // disable edit
    document.getElementById('personalInfoFields').disabled = true;
}