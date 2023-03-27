

// function updateItemAndRedirect(){
//     let params = new URL(window.location.href) //get the url from the search bar
//     ID = params.searchParams.get("docID");
//     localStorage.setItem('itemDocID', ID);
//     window.location.href = 'thanks.html';
// }

// var ID = localStorage.getItem(itemDocID);    //visible to all functions on this page

let params = new URL(window.location.href) //get the url from the search bar
ID = params.searchParams.get("docID");
console.log(ID)

function getItemName(id) {
    db.collection("records")
      .doc(id)
      .get()
      .then((thisItem) => {
        var itemName = thisItem.data().name;
        var itemType = thisItem.data().type;
        var itemCost = thisItem.data().cost;
        var itemBrand = thisItem.data().brand;

        document.getElementById("itemName").innerHTML = itemName;
        $("#name").val(itemName)
        $("#type").val(itemType)
        $("#cost").val(itemCost)
        $("#brand").val(itemBrand)
       
        
          });
}

getItemName(ID);

function writeReview() {
    console.log("updating item")
    let Name = document.getElementById("name").value;
    let Type = document.getElementById("type").value;
    let Cost = document.getElementById("cost").value;
    let Brand = document.getElementById("brand").value;
    let Status = document.querySelector('input[name="status"]:checked').value;
    
    console.log(Name, Type, Cost, Brand, Status);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().ID;
                    db.collection("records").add({
                        itemDocID: itemDocID,
                        userID: userID,
                        name: Name,
                        type: Type,
                        cost: Cost,
                        brand: Brand,
                    }).then(() => {
                        window.location.href = "thanks.html"; //new line added
                    })
                })
        } else {
            console.log("No user is signed in");
            window.location.href = 'thanks.html';
        }
    });
}

