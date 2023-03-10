
function insertUserEmail() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayUserEmail);  //print the user name in the browser console
            user_Email = user.displayUserEmail;

            //method #1:  insert with html only
            //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
            //method #2:  insert using jquery
            $("#userEmail").text(user_Email); //using jquery

        } else {
            // No user is signed in.
        }
    });
}
insertUserEmail(); //run the function