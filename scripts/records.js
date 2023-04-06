function showRecords() {
    // shows all the records on the page
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
                        var name = doc.data().name; 
                        var type = doc.data().type; 
                        var brand = doc.data().brand;
                        var cost = doc.data().cost; 
                        var damage = doc.data().damaged
                        var serial_num = doc.data().serial_num
                        var time = doc.data().timestamp.toDate().toDateString();

                        let recordCard = recordTemplate.content.cloneNode(true);
                        recordCard.querySelector('#item_name').innerHTML = name;   
                        recordCard.querySelector('#date_added').innerHTML = time;   
                        recordCard.querySelector('#item_type').innerHTML = type;
                        recordCard.querySelector('#item_brand').innerHTML = brand;
                        recordCard.querySelector('#item_cost').innerHTML = cost;  
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

function resetRecords() {
    // resets the search applied to the records
    $("#recordCardGroup").empty()
    showRecords()
    $("#search-record-bar").val("")
}

function editRecord(id) {
    // redirects to edit page
    window.location.href = "eachItem.html?docID=" + id
}

function deleteRecord(id) {
    // deletes the record from firebase
    swal("Are you sure you want to delete this record?", {
        buttons: [true, "Delete"]
    })
    $(".swal-button--confirm").click(function () {
        db.collection("records").doc(id).delete().then()
    })
}

function sort_asce_desc(category, filter_type) {
    // sorts the records alphabetically or not by category
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
                        var name = doc.data().name; 
                        var type = doc.data().type; 
                        var brand = doc.data().brand;
                        var cost = doc.data().cost;
                        var damage = doc.data().damaged
                        var serial_num = doc.data().serial_num
                        var time = doc.data().timestamp.toDate().toDateString();
                        
                        let recordCard = recordTemplate.content.cloneNode(true);
                        recordCard.querySelector('#item_name').innerHTML = name;     
                        recordCard.querySelector('#date_added').innerHTML = time;    
                        recordCard.querySelector('#item_type').innerHTML = type;
                        recordCard.querySelector('#item_brand').innerHTML = brand;
                        recordCard.querySelector('#item_cost').innerHTML = cost; 
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
                        var name = doc.data().name; 
                        var type = doc.data().type; 
                        var brand = doc.data().brand;
                        var cost = doc.data().cost; 
                        var damage = doc.data().damaged
                        var serial_num = doc.data().serial_num
                        var time = doc.data().timestamp.toDate().toDateString();
                        
                        let recordCard = recordTemplate.content.cloneNode(true);
                        recordCard.querySelector('#item_name').innerHTML = name;     
                        recordCard.querySelector('#date_added').innerHTML = time;    
                        recordCard.querySelector('#item_type').innerHTML = type;
                        recordCard.querySelector('#item_brand').innerHTML = brand;
                        recordCard.querySelector('#item_cost').innerHTML = cost;  
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

function showRecordBasedOnState(state) {
    // sorts the records, either damaged or not
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
                        var name = doc.data().name; 
                        var type = doc.data().type;
                        var brand = doc.data().brand;
                        var cost = doc.data().cost;
                        var damage = doc.data().damaged
                        var serial_num = doc.data().serial_num
                        var time = doc.data().timestamp.toDate().toDateString();

                        let recordCard = recordTemplate.content.cloneNode(true);
                        recordCard.querySelector('#item_name').innerHTML = name;     
                        recordCard.querySelector('#date_added').innerHTML = time;  
                        recordCard.querySelector('#item_type').innerHTML = type;
                        recordCard.querySelector('#item_brand').innerHTML = brand;
                        recordCard.querySelector('#item_cost').innerHTML = cost; 
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
        // sorts the items based on the category selected, either alphabetical or damaged or not
        var field = $("#field").val()
        var sortby = $(".sort").val()
        const alphabetical_fields = ["name", "type", "brand", "serial_num", "cost"]
        const sorting_fields = ['alpha', 'reverse_alpha', 'damaged', 'not-damaged']
        if ((sortby == "alpha" || sortby == "reverse-alpha") && alphabetical_fields.indexOf(field) != -1) {
            sort_asce_desc(field, sortby)
        }
        else if (sortby == "damaged" || sortby == "not-damaged") {
            showRecordBasedOnState(sortby)
        }
        else if (field == "Category"){
            swal("Please select a category to sort by!")
        }
        else if (sorting_fields.indexOf(sortby) == -1) {
            swal("Pleast select a sort by method!")
        }
        else {
            console.log("no")
        }
    })
    $("#search").click(function () {
        // searches for an item based on the user input and the category selected
        var search_term = $("#search-record-bar").val()
        var field = $("#field").val()
        if (search_term == "") {
            swal("Please enter in search term!")
        }
        else if (field == "Category") {
            swal("Please select a category!")
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
                        records.forEach(doc => {
                            
                            var docID = doc.id;
                            var name = doc.data().name; 
                            var type = doc.data().type; 
                            var brand = doc.data().brand;
                            var cost = doc.data().cost; 
                            var damage = doc.data().damaged
                            var serial_num = doc.data().serial_num
                            var time = doc.data().timestamp.toDate().toDateString();
                            
                            let recordCard = recordTemplate.content.cloneNode(true);
                            recordCard.querySelector('#item_name').innerHTML = name;    
                            recordCard.querySelector('#date_added').innerHTML = time;   
                            recordCard.querySelector('#item_type').innerHTML = type;
                            recordCard.querySelector('#item_brand').innerHTML = brand;
                            recordCard.querySelector('#item_cost').innerHTML = cost; 
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
    $("#field").click(function () {
        // changes the sorting method based on category selected
        var value = $("#field").val()
        if (value == "cost") {
            $("#asec").html("Low to High")
            $("#desc").html("High to Low")
        }
        else {
            $("#asec").html("A-Z")
            $("#desc").html("Z-A")
        }
    })
})
