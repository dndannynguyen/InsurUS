

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
        var itemBrand = thisItem.data().brand;
        var itemCost = thisItem.data().cost;
        var itemSerialNum = thisItem.data().serial_num;

        document.getElementById("itemName").innerHTML = itemName;
        $("#name").val(itemName)
        $("#type").val(itemType)
        $("#brand").val(itemBrand)
        $("#cost").val(itemCost)
        $("#serial_num").val(itemSerialNum)
       
        
          });
}

getItemName(ID);


function updateItem() {
    console.log("updating item")
    let Name = document.getElementById("name").value;
    let Type = document.getElementById("type").value;
    let Brand = document.getElementById("brand").value;
    let Cost = document.getElementById("cost").value;
    let SerialNum = document.getElementById("serial_num").value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {

            var currentItem = db.collection("records").doc(ID)
            currentItem.update({
                name: Name,
                type: Type,
                brand: Brand,
                cost: Cost,
                serial_num: SerialNum
            })
            .then(() => {
                swal("Record updated successfully!", {
                    button: "See Records"
                })
                $(".swal-button--confirm").click(function () {
                    window.location.href = "records.html";
                })
            }) 

        } else {
            console.log("No users signed in.")
            window.location.href = 'eachItem.html';
        }
    })
}