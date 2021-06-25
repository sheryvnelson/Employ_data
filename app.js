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
        const temp = persondoc.slice(start, end);
        // console.log(temp);
        formData(temp);

    });



function formData(arrays) {

    var docs = `<tr>
                <th>ID</th>
                <th>Salutation</th>
                 <th>FirstName <button id="namecol" class="namesort" onclick="sortname()"  ><i class="fas fa-sort" ></i></button></th>
    
                <th>LastName</th>
                <th>Email</th>
                <th>Gender</th>
                <th>PhoneNo</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th >Date<button id="datecol" class="datesort" onclick="datesort()"><i class="fas fa-sort"></i></button>
                <th>Options</th>
                </tr>`;
    // onclick = "sortTable(2)">FIRST NAME<i class="fas fa-sort"></i></th>
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
    document.getElementById("next").style.display = 'block';
    // console.log(temp);
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
    // console.log(filtername);
    formData(filtername);


});


// sorting
let ascendname = true;

function sortname() {



    if (ascendname) {
        persondoc.sort((a, b) => {
            ascendname = false;
            var firstName = a.firstname.toLowerCase();
            var secondName = b.firstname.toLowerCase();

            return (firstName < secondName) ? -1 : (firstName > secondName) ? 1 : 0;
        });

    } else {
        persondoc.sort((a, b) => {
            ascendname = true;
            var firstName = a.firstname.toLowerCase();
            var secondName = b.firstname.toLowerCase();

            return (firstName < secondName) ? 1 : (firstName > secondName) ? -1 : 0;
            console.log(((firstName < secondName) ? -1 : (firstName > secondName) ? 1 : 0));
        });
    }
    formData(persondoc);
};
// datesort


// let datesorted = true;

// function datesort() {

//     if (datesorted) {
//         persondoc.sort((a, b) => {

//             datesorted = false;
//             var date1 = new Date(a.date);

//             var date2 = new Date(b.date);
//             // Ternary Operator (if it will check the condition ) then -1 else if()
//             return (date1 - date2);
//         });
//     } else {
//         persondoc.sort((a, b) => {
//             datesorted = true;
//             var date1 = new Date(a.date);

//             var date2 = new Date(b.date);

//             // Ternary Operator (if it will check the condition ) then -1 else if()
//             return (date2 - date1);
//         });
//         formData(persondoc);
//     };


// };



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
    let current = day + '/' + month + '/' + year;
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
    var index = document.getElementById("index").value;


    let arr = { "id": id, "salutation": salutation, "firstname": firstname, "lastname": lastname, "email": email, "gender": gender, "phoneno": phoneno, "country": country, "state": state, "city": city, "date": current };
    console.log(index);
    if (index == "" || index == undefined) {
        persondoc.push(arr);
        formData(persondoc);
        resetmyform();
        addAlert();
        // clear();


        hide();


        // showAlert('Successfully Added!!!', 'success');


    } else {
        persondoc.splice(index, 1, arr);
        changeAlert('Successfully Edited!!!', 'success');

        document.getElementById('btnSave').innerHTML = "Save";
        // document.getElementById('btn').innerHTML = "Edit";
    }

    formData(persondoc);
    // console.log(data)

    hide();

    // console.log(a)
};


function resetmyform() {
    firstname = document.getElementById("firstname").value = "";
    id = document.getElementById("id").value = "";
    salutation = document.getElementById("salutation1").value = "";
    firstname = document.getElementById("firstname").value = "";
    lastname = document.getElementById("lastname").value = "";
    email = document.getElementById("email").value = "";
    gender = document.querySelector('input[type=radio][name=gender]:checked').value = "";
    phoneno = document.getElementById("phoneno").value = "";
    country = document.getElementById("countrys").value = "";
    state = document.getElementById("selected").value = "";
    city = document.getElementById("city").value = "";
    index = document.getElementById("index").value = "";
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




    show();
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

        // } else if()
        //     let doc = document.getElementById("id").value;
        //     for(let i = 0; i<persondoc.length; i++) {
        //     if ((persondoc[i].id == doc));
        //     document.getElementById('msgId').innerHTML = "**Already exists";
        // }
        //     }  
    }

    else {
        document.getElementById('msgId').innerHTML = "";
        id.style.color = 'black';
    }

});


firstname.addEventListener('input', function () {
    if (firstname.value.length > 10 || firstname.value === '') {
        firstname.style.color = 'red';

        document.getElementById('msgfirstname').innerHTML = "**Enter valid name";
        msg.style.color = 'red';

    }
    else {
        document.getElementById('msgfirstname').innerHTML = "";
        firstname.style.color = 'black';
    }
});
lastname.addEventListener('input', function () {
    if (lastname.value.length > 10 || lastname.value === '') {
        lastname.style.color = 'black';
        document.getElementById('msglastname').innerHTML = "**Not  large than 8";
        msg.style.color = 'red';

    }
    else {
        document.getElementById('msglastname').innerHTML = "";
        lastname.style.color = 'black';
    }
});
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

});


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
});
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