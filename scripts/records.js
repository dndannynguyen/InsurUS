function showRecords() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            //go to the correct user document by referencing to the user uid
            var userID = user.uid;            
            //get the document for current user.
            let recordTemplate = document.getElementById("recordTemplate");
            let recordCardGroup = document.getElementById("recordCardGroup");
            
            db.collection("records")
            .where("userID", "==", userID)
            .orderBy("timestamp", "desc")
                .onSnapshot(allRecords => {
                    $("#recordCardGroup").empty()
                    records = allRecords.docs;
                    records.forEach(doc => {
                        var docID = doc.id
                        var name = doc.data().name; //gets the name field
                        var type = doc.data().type; //gets the unique ID field
                        var brand = doc.data().brand;
                        var cost = doc.data().cost; //gets the length field
                        var damage = doc.data().damaged
                        var serial_num = doc.data().serial_num
                        var time = doc.data().timestamp.toDate().toDateString();

                        let recordCard = recordTemplate.content.cloneNode(true);
                        recordCard.querySelector('#item_name').innerHTML = name;     //equiv getElementByClassName
                        recordCard.querySelector('#date_added').innerHTML = time;    //equiv getElementByClassName
                        recordCard.querySelector('#item_type').innerHTML = type;
                        recordCard.querySelector('#item_brand').innerHTML = brand;
                        recordCard.querySelector('#item_cost').innerHTML = cost;  //equiv getElementByClassName
                        recordCard.querySelector('#item_status').innerHTML = damage
                        recordCard.querySelector('#item_serial_num').innerHTML = serial_num
                        recordCard.querySelector('.edit-record').setAttribute("id", docID)
                        recordCard.querySelector('.delete-record').setAttribute("id", docID)
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
}

function editRecord(id) {
    window.location.href = "eachItem.html?docID=" + id
}

function deleteRecord(id) {
    console.log(id)
    deleted = confirm("Are you sure you want to delete this record?")
    if (deleted) {
        db.collection("records").doc(id).delete().then()
        console.log("Deleted")
    }
}

function sort_asce_desc(category, filter_type) {
    $("#recordCardGroup").empty()
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            var userID = user.uid;            
            //get the document for current user.
            let recordTemplate = document.getElementById("recordTemplate");
            let recordCardGroup = document.getElementById("recordCardGroup");
            if (filter_type == "alpha") {
                db.collection("records")
                .where("userID", "==", userID)
                .orderBy(category)
                .onSnapshot(allRecords => {
                    $("#recordCardGroup").empty()
                    records = allRecords.docs;
                    records.forEach(doc => {
                        var docID = doc.id
                        var name = doc.data().name; //gets the name field
                        var type = doc.data().type; //gets the unique ID field
                        var brand = doc.data().brand;
                        var cost = doc.data().cost; //gets the length field
                        var damage = doc.data().damaged
                        var serial_num = doc.data().serial_num
                        var time = doc.data().timestamp.toDate().toDateString();
                        
                        let recordCard = recordTemplate.content.cloneNode(true);
                        recordCard.querySelector('#item_name').innerHTML = name;     //equiv getElementByClassName
                        recordCard.querySelector('#date_added').innerHTML = time;    //equiv getElementByClassName
                        recordCard.querySelector('#item_type').innerHTML = type;
                        recordCard.querySelector('#item_brand').innerHTML = brand;
                        recordCard.querySelector('#item_cost').innerHTML = cost;  //equiv getElementByClassName
                        recordCard.querySelector('#item_status').innerHTML = damage
                        recordCard.querySelector('#item_serial_num').innerHTML = serial_num
                        recordCard.querySelector('.edit-record').setAttribute("id", docID)
                        recordCard.querySelector('.delete-record').setAttribute("id", docID)
                        recordCardGroup.appendChild(recordCard);
                    })
                })
            }
            else {
                db.collection("records")
                .where("userID", "==", userID)
                .orderBy(category, "desc")
                .onSnapshot(allRecords => {
                    $("#recordCardGroup").empty()
                    records = allRecords.docs;
                    records.forEach(doc => {
                        var docID = doc.id
                        var name = doc.data().name; //gets the name field
                        var type = doc.data().type; //gets the unique ID field
                        var brand = doc.data().brand;
                        var cost = doc.data().cost; //gets the length field
                        var damage = doc.data().damaged
                        var serial_num = doc.data().serial_num
                        var time = doc.data().timestamp.toDate().toDateString();
                        
                        let recordCard = recordTemplate.content.cloneNode(true);
                        recordCard.querySelector('#item_name').innerHTML = name;     //equiv getElementByClassName
                        recordCard.querySelector('#date_added').innerHTML = time;    //equiv getElementByClassName
                        recordCard.querySelector('#item_type').innerHTML = type;
                        recordCard.querySelector('#item_brand').innerHTML = brand;
                        recordCard.querySelector('#item_cost').innerHTML = cost;  //equiv getElementByClassName
                        recordCard.querySelector('#item_status').innerHTML = damage
                        recordCard.querySelector('#item_serial_num').innerHTML = serial_num
                        recordCard.querySelector('.edit-record').setAttribute("id", docID)
                        recordCard.querySelector('.delete-record').setAttribute("id", docID)
                        recordCardGroup.appendChild(recordCard);
                    })
                })
            }
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });    
}

function showRecordBasedState(state) {
    var state_value = "No"
    if (state == "damaged") {
        state_value = "Yes"
    }

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            var userID = user.uid;            
            //get the document for current user.
            let recordTemplate = document.getElementById("recordTemplate");
            let recordCardGroup = document.getElementById("recordCardGroup");
            
            db.collection("records")
            .where("userID", "==", userID)
            .where("damaged", "==", state_value)
            .orderBy("timestamp", "desc")
                .onSnapshot(allRecords => {
                    $("#recordCardGroup").empty()
                    records = allRecords.docs;
                    records.forEach(doc => {
                        var docID = doc.id
                        var name = doc.data().name; //gets the name field
                        var type = doc.data().type; //gets the unique ID field
                        var brand = doc.data().brand;
                        var cost = doc.data().cost; //gets the length field
                        var damage = doc.data().damaged
                        var serial_num = doc.data().serial_num
                        var time = doc.data().timestamp.toDate().toDateString();

                        let recordCard = recordTemplate.content.cloneNode(true);
                        recordCard.querySelector('#item_name').innerHTML = name;     //equiv getElementByClassName
                        recordCard.querySelector('#date_added').innerHTML = time;    //equiv getElementByClassName
                        recordCard.querySelector('#item_type').innerHTML = type;
                        recordCard.querySelector('#item_brand').innerHTML = brand;
                        recordCard.querySelector('#item_cost').innerHTML = cost;  //equiv getElementByClassName
                        recordCard.querySelector('#item_status').innerHTML = damage
                        recordCard.querySelector('#item_serial_num').innerHTML = serial_num
                        recordCard.querySelector('.edit-record').setAttribute("id", docID)
                        recordCard.querySelector('.delete-record').setAttribute("id", docID)
                        recordCardGroup.appendChild(recordCard);
                    })
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });    

}


$(document).ready(function () {
    showRecords()
    $("#sort").click(function () {
        var field = $("#field").val()
        var sortby = $(".sort").val()
        const alphabetical_fields = ["name", "type", "brand", "serial_num", "cost"]
        console.log(field)
        console.log(sortby)
        console.log(sortby == "alpha")
        console.log(alphabetical_fields.indexOf(field) != -1)
        if ((sortby == "alpha" || sortby == "reverse-alpha") && alphabetical_fields.indexOf(field) != -1) {
            sort_asce_desc(field, sortby)
        }
        else if (sortby == "damaged" || sortby == "not-damaged") {
            console.log("sorting by damage")
            showRecordBasedState(sortby)
        }
        else {
            console.log("no sort")
        }
    })
    $("#search").click(function () {
        var search_term = $("#search-record-bar").val()
        var field = $("#field").val()
        console.log(field)
        if (search_term == "") {
            alert("Please enter in search term!")
        }
        else if (field == "Category") {
            alert("Please select a category!")
        }
        else {
            $("#recordCardGroup").empty()
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    var userID = user.uid;            
                    let recordTemplate = document.getElementById("recordTemplate");
                    let recordCardGroup = document.getElementById("recordCardGroup");
                    
                    db.collection("records")
                    .where("userID", "==", userID)
                    .where(field, "==", search_term)
                    .onSnapshot(allRecords => {
                        records = allRecords.docs;
                        console.log(records);
                        records.forEach(doc => {
                            
                            var docID = doc.id;
                            var name = doc.data().name; //gets the name field
                            var type = doc.data().type; //gets the unique ID field
                            var brand = doc.data().brand;
                            var cost = doc.data().cost; //gets the length field
                            var damage = doc.data().damaged
                            var serial_num = doc.data().serial_num
                            var time = doc.data().timestamp.toDate().toDateString();
                            
                            let recordCard = recordTemplate.content.cloneNode(true);
                            recordCard.querySelector('#item_name').innerHTML = name;     //equiv getElementByClassName
                            recordCard.querySelector('#date_added').innerHTML = time;    //equiv getElementByClassName
                            recordCard.querySelector('#item_type').innerHTML = type;
                            recordCard.querySelector('#item_brand').innerHTML = brand;
                            recordCard.querySelector('#item_cost').innerHTML = cost;  //equiv getElementByClassName
                            recordCard.querySelector('#item_status').innerHTML = damage
                            recordCard.querySelector('#item_serial_num').innerHTML = serial_num
                            recordCard.querySelector('.edit-record').setAttribute("id", docID)
                            recordCard.querySelector('.delete-record').setAttribute("id", docID)
                            recordCardGroup.appendChild(recordCard);
                        })
                    })
                } 
                else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });    
        }

    })

})
