function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here.
            console.log($('#navbarPlaceholder').load('./text/navafterlogin.html'));
            console.log($('#footerPlaceholder').load('./text/footer.html'));
        } else {
            // No user is signed in.
            console.log($('#navbarPlaceholder').load('./text/nav.html'));
            console.log($('#footerPlaceholder').load('./text/footer.html'));
        }
    });
}
loadSkeleton(); //invoke the function