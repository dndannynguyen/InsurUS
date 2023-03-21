function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here.
            $('#navbarPlaceholder').load('./text/navafterlogin.html');
            $('#footerPlaceholder').load('./text/footer.html');
        } else {
            // No user is signed in.
            $('#navbarPlaceholder').load('./text/nav.html');
            $('#footerPlaceholder').load('./text/footer.html');
        }
    });
}
loadSkeleton(); //invoke the function