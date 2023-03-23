function showRecords() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            //go to the correct user document by referencing to the user uid
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;            
            //get the document for current user.
            console.log(currentUser)
            console.log(userID)
            let recordTemplate = document.getElementById("recordTemplate");
            let recordCardGroup = document.getElementById("recordCardGroup");
            
            db.collection("records")
            .where("userID", "==", userID)
            .orderBy("timestamp")
            .get()
                .then(allRecords => {
                    records = allRecords.docs;
                    console.log(records);
                    records.forEach(doc => {

                        var name = doc.data().name; //gets the name field
                        var type = doc.data().type; //gets the unique ID field
                        var brand = doc.data().brand;
                        var cost = doc.data().cost; //gets the length field
                        var time = doc.data().timestamp.toDate().toDateString();

                        let recordCard = recordTemplate.content.cloneNode(true);
                        recordCard.querySelector('#item_name').innerHTML = name;     //equiv getElementByClassName
                        recordCard.querySelector('#date_added').innerHTML = time;    //equiv getElementByClassName
                        recordCard.querySelector('#item_type').innerHTML = type;
                        recordCard.querySelector('#item_brand').innerHTML = brand;
                        recordCard.querySelector('#item_cost').innerHTML = cost;  //equiv getElementByClassName
                        recordCardGroup.appendChild(recordCard);
                    })
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });    

}

function reset_records() {
    $("#recordCardGroup").empty()
    showRecords()
    $("#search-record-bar").val("")
    $("button#reset-records").remove()
}


$(document).ready(function () {
    showRecords()
    $("#filter").click(function () {
        var search_term = $("#search-record-bar").val()
        var field = $("#field").val()
        // search_term = "%" + search_term + "%"
        console.log(search_term)
        $("#recordCardGroup").empty()
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var userID = user.uid;            
                let recordTemplate = document.getElementById("recordTemplate");
                let recordCardGroup = document.getElementById("recordCardGroup");
                
                db.collection("records")
                .where("userID", "==", userID)
                .where(field, "==", search_term)
                .get()
                    .then(allRecords => {
                        records = allRecords.docs;
                        console.log(records);
                        records.forEach(doc => {

                            var name = doc.data().name; //gets the name field
                            var type = doc.data().type; //gets the unique ID field
                            var brand = doc.data().brand;
                            var cost = doc.data().cost; //gets the length field
                            var time = doc.data().timestamp.toDate().toDateString();

                            let recordCard = recordTemplate.content.cloneNode(true);
                            recordCard.querySelector('#item_name').innerHTML = name;     //equiv getElementByClassName
                            recordCard.querySelector('#date_added').innerHTML = time;    //equiv getElementByClassName
                            recordCard.querySelector('#item_type').innerHTML = type;
                            recordCard.querySelector('#item_brand').innerHTML = brand;
                            recordCard.querySelector('#item_cost').innerHTML = cost;  //equiv getElementByClassName
                            recordCardGroup.appendChild(recordCard);
                        })
                    })
                $("#search-record-group").append(
                    `<button class=btn-primary id="reset_records" onclick="reset_records()">Reset Search</button>`
                )        
            } 
            else {
                // No user is signed in.
                console.log ("No user is signed in");
            }
        });    

    })

})
