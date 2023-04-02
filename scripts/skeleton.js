function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('#navbarPlaceholder').load('./text/navafterlogin.html');
        } else {
            $('#navbarPlaceholder').load('./text/navb4login.html');
        }
    });
}
loadSkeleton();