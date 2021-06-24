// Retrieving Data from json file

// globally  declared array.
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
        const temp = persondoc.slice(start, end);
        // console.log(temp);
        formData(temp);

    });



function formData(arrays) {

    var docs = `<tr>
                <th>ID</th>
                <th>Salutation</th>
                 <th > FirstName <button id="namecol" class="namesort"><i class="fas fa-sort"></i></button> 
                <th>LastName</th>
                <th>Email</th>
                <th>Gender</th>
                <th>PhoneNo</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th >Date<button id="datecol" class="datesort"><i class="fas fa-sort"></i></button>
                </th>
                <th>Options</th>
                </tr>`;
    // <button id="namecol" class="namesort"><i class="fas fa-sort"></i></button> 
    // <button id="datecol" class="datesort"><i class="fas fa-sort"></i></button>
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

};

document.getElementById("previ").addEventListener("click", function () {

    const no = parseInt(document.getElementById('page').value);
    const start = page * no;
    const end = page * no + no;
    const temp = persondoc.slice(start, end);
    console.log(temp);
    formData(temp);
});

document.getElementById("next").addEventListener("click", function () {

    const no = parseInt(document.getElementById('page').value);
    const start = no;
    const end = no + 9;
    const temp = persondoc.slice(start, end);
    console.log(temp);
    formData(temp);

});

document.getElementById("all").addEventListener("click", function () {

    // formData(temp);
    formData(persondoc);
});



//Search input

const usersearch = document.getElementById('search-input');
// Search input Eventlistner
usersearch.addEventListener('keyup', (e) => {
    // Get searching input
    const textinput = e.target.value;
    const filtername = persondoc.filter(data => (data.firstname.toLowerCase()).match(textinput.toLowerCase()));
    console.log(filtername);
    formData(filtername);

});


// sorting by name
// function sortTable(n) {
//     var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
//     table = document.getElementById("Tablelist");
//     switching = true;
//     //Set the sorting direction to ascending:
//     dir = "asc";
//     /*Make a loop that will continue until
//     no switching has been done:*/
//     while (switching) {
//         //start by saying: no switching is done:
//         switching = false;
//         rows = table.rows;
//         /*Loop through all table rows (except the
//         first, which contains table headers):*/
//         for (i = 1; i < (rows.length - 1); i++) {
//             //start by saying there should be no switching:
//             shouldSwitch = false;
//             /*Get the two elements you want to compare,
//             one from current row and one from the next:*/
//             x = rows[i].getElementsByTagName("TD")[n];
//             y = rows[i + 1].getElementsByTagName("TD")[n];
//             /*check if the two rows should switch place,
//             based on the direction, asc or desc:*/
//             if (dir == "asc") {
//                 if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//                     //if so, mark as a switch and break the loop:
//                     shouldSwitch = true;
//                     break;
//                 }
//             } else if (dir == "desc") {
//                 if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
//                     //if so, mark as a switch and break the loop:
//                     shouldSwitch = true;
//                     break;
//                 }
//             }
//         }
//         if (shouldSwitch) {

//             rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//             switching = true;

//             switchcount++;
//         } else {
//             /*If no switching has been done AND the direction is "asc",
//             set the direction to "desc" and run the while loop again.*/
//             if (switchcount == 0 && dir == "asc") {
//                 dir = "desc";
//                 switching = true;
//             }
//         }
//     }
// }

// sort

let ascendname = true;
let namesorts = document.getElementById('Tablelist');
namesorts.addEventListener('click', (e) => {
    if (ascendname) {
        persondoc.sort((a, b) => {
            ascendname = false;
            var firstName = a.firstname.toLowerCase();
            var secondName = b.firstname.toLowerCase();

            return (firstName < secondName) ? -1 : (firstName > secondName) ? 1 : 0;
        })

    } else {
        persondoc.sort((a, b) => {
            ascendname = true;
            var firstName = a.firstname.toLowerCase();
            var secondName = b.firstname.toLowerCase();

            return (firstName < secondName) ? 1 : (firstName > secondName) ? -1 : 0;
        })
    }
    formData(persondoc);
});

// let isAscDate = true;
// // let isAscDateSorted = true;
// const sortdate = document.getElementById('datecol');

// sortdate.addEventListener('blur', (e) => {
//     if (isAscDate) {
//         persondoc.sort((a, b) => {

//             isAscDate = false;
//             console.log("date" + a.date);
//             var date = Date(a.date);

//             console.log(date);
//             var secondDate = Date(b.date);
//             // Ternary Operator (if it will check the condition ) then -1 else if()
//             return (date - secondDate);
//         })
//     } else {
//         persondoc.sort((a, b) => {
//             isAscDate = true;
//             var date = Date(a.date);

//             var secondDate = Date(b.date);
//             // Ternary Operator (if it will check the condition ) then -1 else if()
//             return (secondDate - date);
//         })
//     }
//     formData(persondoc);
// });





// popup function
function hide() {
    document.getElementById('popupdata').style.display = 'none';


};

function show() {
    document.getElementById('popupdata').style.display = 'block';

};
document.getElementById("popupdata").reset();


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

    // alert('rrrrrrrr' + index);
    if (index == "" || index == undefined) {
        //    validate(); 

        persondoc.push(arr);
        formData(persondoc);
        show();

    }
    else {

        persondoc.splice(index, 1, arr);
        //    addAlert();
        show();
    }

    formData(persondoc);
    hide();
    // reset();

};


// delete user
function deleteUser(i) {
    // console.log(i);
    alert("do you want to delete?");

    persondoc.splice(i, 1);
    formData(persondoc);

    deletemsg();


};

// country state 
const selectCountry = document.getElementById('countrys');
selectCountry.addEventListener('click', (e) => {
    let stateform = '';
    console.log(stateform);
    if (selectCountry.value === 'India') {
        document.getElementById('selected').value = '';
        const indianstate = ['Kerala', 'Karnataka', 'Banglore'];
        indianstate.forEach(state => {
            stateform += `
                <option>${state}</option>`
        });
        console.log(stateform);
        document.getElementById("selected").innerHTML = stateform;
    }
    if (selectCountry.value === 'Canada') {
        document.getElementById('selected').value = '';
        const stateanother = ['Alberta', 'Manitoba', 'Novia scotiba'];
        stateanother.forEach(state => {
            stateform += `
                <option>${state}</option> `
        });
        console.log(stateform);
        document.getElementById("selected").innerHTML = stateform;
    }
    if (selectCountry.value === 'Germany') {
        document.getElementById('selected').value = '';
        const stateanother = ['Usco'];
        stateanother.forEach(state => {
            stateform += `
                <option>${state}</option> `
        });
        console.log(stateform);
        document.getElementById("selected").innerHTML = stateform;
    }
});


// message function
function deletemsg() {
    document.querySelector(".removed").style.visibility = "visible";
    setTimeout(function () {
        document.querySelector(".removed").style.visibility = "hidden";
    }, 2000);
};

function addAlert() {
    document.querySelector(".addalert").style.visibility = "visible";
    setTimeout(function () {
        document.querySelector(".addalert").style.visibility = "hidden";
    }, 3000);

};

function changeAlert() {
    document.querySelector(".changealert").style.visibility = "visible";
    setTimeout(function () {
        document.querySelector(".changealert").style.visibility = "hidden";
    }, 3000);

};
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



};
// validation

let id = document.getElementById('id');
let msg = document.querySelector('.msg');
let salutation = document.getElementById('salutation1');
let firstname = document.getElementById('firstname');
let lastname = document.getElementById('lastname');
let email = document.getElementById('email');
let phone = document.getElementById('phoneno');
let city = document.getElementById("city");

id.addEventListener('input', function () {
    if (id.value.length > 2 || id.value === '') {
        id.style.color = 'red';
        document.getElementById('msgId').innerHTML = "**Not large than 2";
        msg.style.color = 'red';

    }
    else {
        document.getElementById('msgId').innerHTML = "";
        id.style.color = 'black';
    }

});
// let doc = document.getElementById("id").value;
// for (let i = 0; i < persondoc.length; i++) {
//     if ((persondoc[i].id == doc));
//     document.getElementById('msgId').innerHTML = "**Not large than 2";
// };





salutation.addEventListener('input', function () {
    if (salutation.value.length > 3 || salutation.value === '') {
        document.getElementById('msgSalutation').innerHTML = "**Not large than 3";
        msg.style.color = 'red';
        salutation.style.color = 'red';

    }
    else {
        document.getElementById('msgSalutation').innerHTML = "";
        salutation.style.color = 'black';
    }
})

firstname.addEventListener('input', function () {
    if (firstname.value.length <= 0 || firstname.value === '') {
        firstname.style.color = 'red';

        document.getElementById('msgfirstname').innerHTML = "**Enter valid name";
        msg.style.color = 'red';

    }
    else {
        document.getElementById('msgfirstname').innerHTML = "";
        firstname.style.color = 'black';
    }
})
lastname.addEventListener('input', function () {
    if (lastname.value.length > 8 || lastname.value === '') {
        lastname.style.color = 'black';
        document.getElementById('msglastname').innerHTML = "**Not  large than 8";
        msg.style.color = 'red';

    }
    else {
        document.getElementById('msglastname').innerHTML = "";
        lastname.style.color = 'black';
    }
})
email.addEventListener('input', function () {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.value.match(re)) {
        document.getElementById('msgemail').innerHTML = "**Enter Valid email";
        msg.style.color = 'red';
        email.style.color = 'red';
    }
    else {
        document.getElementById('msgemail').innerHTML = "";
        email.style.color = 'black';
    }

})


phone.addEventListener('input', function () {
    let phoneno = /^\d{10}$/;
    if (!phone.value.match(phoneno)) {
        document.getElementById('msgno').innerHTML = "** Enter 10 digits";
        msg.style.color = 'red';
        phone.style.color = 'black';
    }
    else {
        document.getElementById('msgno').innerHTML = "";
        phone.style.color = 'black';
    }
})
city.addEventListener('input', function () {
    if (city.value.length > 10 || city.value === '') {
        document.getElementById('msgcity').innerHTML = "**Not larger than 10";
        msg.style.color = 'red';
        city.style.color = 'black';

    }
    else {
        document.getElementById('msgcity').innerHTML = "";
        city.style.color = 'black';
    }
});