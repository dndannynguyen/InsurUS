function loadSkeleton() {
    // loads the navbar onto the page
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('#navbarPlaceholder').load('./text/navafterlogin.html');
        } else {
            $('#navbarPlaceholder').load('./text/navb4login.html');
        }
    });
}

$(document).ready(
    loadSkeleton()
)