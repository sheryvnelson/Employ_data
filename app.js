// Retrieving Data from json file
let persondoc = [];
let page = 0;
fetch("detail.json")

    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        persondoc = data;
        const no = parseInt(document.getElementById('page').value);
        const start = page * no;
        const end = page * no + no;
        const action = persondoc.slice(start, end);
        formData(action);
    })
function formData(arrays) {
    var docs = `<tr>
                <th>ID</th>
                <th>Salutation</th>
                <th onclick="sortTable(2)">FirstName<i class="fas fa-sort"></i></th>
                <th>LastName</th>
                <th>Email</th>
                <th>Gender</th>
                <th>PhoneNo</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th onclick="sortTable(10,'D','ymd')" id="datecol">Date<i class="fas fa-sort"></i>
                </th>
                <th>Options</th>
                </tr>`;
    arrays.forEach(function (arr, i) {
        docs += `<tr>
                <td>${arr.id}</td>
                <td>${arr.salutation}</td>
                <td>${arr.firstname}</td>
                <td>${arr.lastname}</td>
                <td>${arr.email}</td>
                <td>${arr.gender}</td>
                <td>${arr.phoneno}</td>
               <td>${arr.country}</td>
               <td>${arr.state}</td>
                <td>${arr.city}</td>
                <td>${arr.date}</td>
                <td><a onclick = editUser(${i})  class="edit"><i class="fas fa-edit"></i></a>&nbsp;&nbsp;|&nbsp;&nbsp;
                <a class='delete'  onclick = deleteUser(${i})><i class="fas fa-remove"></i></a></td></tr>`;
    })
    document.getElementById("Tablelist").innerHTML = docs;

}
// 
document.getElementById("previ").addEventListener("click", function () {
    // alert("Hai");
    const no = parseInt(document.getElementById('page').value);
    const start = page * no;
    const end = page * no + no;
    const action = persondoc.slice(start, end);
    console.log(action);
    formData(action);
})
document.getElementById("next").addEventListener("click", function () {
    // alert("Hai");
    const no = parseInt(document.getElementById('page').value);
    const start = no;
    const end = no + 9;
    const action = persondoc.slice(start, end);
    console.log(action);
    formData(action);
})

document.getElementById("all").addEventListener("click", function () {
    // alert("Hai");
    formData(persondoc);
})


// searching
function searching() {
    let count = document.getElementById('Tablelist').rows[0].cells.length//col count
    let input, filter, table, tr, td, i;
    input = document.getElementById("search-input");
    var input_value = document.getElementById("search-input").value;
    filter = input.value.toLowerCase();
    if (input_value != '') {
        table = document.getElementById("Tablelist");
        tr = table.getElementsByTagName("tr");//loop through each cell
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 1; i < tr.length; i++) {
            var flag = 0;
            for (j = 0; j < count; j++) {
                td = tr[i].getElementsByTagName("td")[j];
                if (td) {
                    var td_text = td.innerHTML;
                    if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
                        flag = 1;
                    } else {
                        //pass
                    }
                }
            }
            if (flag == 1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}



// sorting



function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("Tablelist");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;

            x = (rows[i].getElementsByTagName("TD")[n]);
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

// popup function
function hide() {
    document.getElementById('popupdata').style.display = 'none';
};

function show() {
    document.getElementById('popupdata').style.display = 'block';
};


function AddRow() {

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let current = day + '-' + month + '-' + year;
    let id = document.getElementById("id").value;
    let salutation = document.getElementById("salutation1").value;
    let firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var gender = document.querySelector('input[type=radio][name=gender]:checked').value;
    var phoneno = document.getElementById("phoneno").value;
    var country = document.getElementById("countrys").value;
    var state = document.getElementById("selected").value;
    var city = document.getElementById("city").value;
    let index = document.getElementById('index').value;

    let arr = { "id": id, "salutation": salutation, "firstname": firstname, "lastname": lastname, "email": email, "gender": gender, "phoneno": phoneno, "country": country, "state": state, "city": city, "date": current };
    console.log(index);
    if (index == "" || index == undefined) {
        //    validate(); 
        persondoc.push(arr);
        hide();

    }
    else {
        persondoc.splice(index, 1, arr);
        addAlert();


    }
    formData(persondoc);
    // hide();




}

// delete user
function deleteUser(i) {
    // console.log(i);
    alert("do you want to delete?");

    persondoc.splice(i, 1);
    formData(persondoc);

    deletemsg();



}
// country n state fields
const selectedCountry = document.getElementById('countrys');
selectedCountry.addEventListener('blur', (e) => {
    let seenState = '';
    console.log(seenstate);
    if (selectedCountry.value === 'India') {
        const states_india = ['Kerala', 'Tamil Nadu', 'Karnataka',
            'Telangana', 'Andhra Pradesh', 'Arunachal Pradesh',
            'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat'];
        states_india.forEach(state => {
            seenstate += `
                <option>${state}</option> `
        });
        console.log(seenstate);
    } else {
        const Canadastate = ['Alberta', 'Manitoba', 'Novia Scotia'];
        Canadastate.forEach(state => {
            seenstate += `
                <option>${state}</option> `
        });
        console.log(seenState);
    }
    document.getElementById("selected").innerHTML = seenstate;
})

// alert messages
function deletemsg() {
    document.querySelector(".removed").style.visibility = "visible";
    setTimeout(function () {
        document.querySelector(".removed").style.visibility = "hidden";
    }, 2000);
}

function addAlert() {
    document.querySelector(".addalert").style.visibility = "visible";
    setTimeout(function () {
        document.querySelector(".addalert").style.visibility = "hidden";
    }, 3000);

}
function changeAlert() {
    document.querySelector(".changealert").style.visibility = "visible";
    setTimeout(function () {
        document.querySelector(".changealert").style.visibility = "hidden";
    }, 3000);

}
// Edit User

function editUser(i) {
    show();



    // console.log(i)
    var arr = persondoc[i];
    // console.log(arr);
    document.getElementById('id').value = arr.id;
    document.getElementById('salutation1').value = arr.salutation;
    document.getElementById('firstname').value = arr.firstname;
    document.getElementById('lastname').value = arr.lastname;
    document.getElementById('email').value = arr.email;
    document.getElementsByName('gender').value = arr.gender;
    document.getElementById('phoneno').value = arr.phoneno;
    document.getElementById('countrys').value = arr.country;
    document.getElementById('selected').value = arr.state;
    document.getElementById('city').value = arr.city;

    document.getElementById('index').value = i;



}


