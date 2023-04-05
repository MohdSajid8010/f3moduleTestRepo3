
var no_of_student = 0;
let student_arr = [];
function addStudent() {
    var name = document.getElementById("username_inp");
    var email = document.getElementById("email_inp");
    var gpa = document.getElementById("GPA_inp");
    var age = document.getElementById("age_inp");
    var degree = document.getElementById("degree_inp");
    // console.log(name.value, email.value, gpa.value, age.value, degree.value);

    if (name.value == "" || email.value == "" || gpa.value == "" || age.value == "" || degree.value == "") {
        alert("all field is mandatory");
        return;
    }

    no_of_student++;

    student_arr.push({
        ID: no_of_student,
        name: name.value,
        age: age.value,
        grade: gpa.value,
        degree: degree.value,
        email: email.value
    })


    // console.log(student_arr);
    localStorage.setItem("student_arr", JSON.stringify(student_arr))
    document.getElementById("username_inp").value = "";
    document.getElementById("email_inp").value = "";
    document.getElementById("GPA_inp").value = "";
    document.getElementById("age_inp").value = "";
    document.getElementById("degree_inp").value = "";
    showTable();
}

// let new_tr=document.getElementById("table_row")
let showTable = () => {
    // new_tr="";
    // student_arr.map((student, idx) => 
    // {
    //     return ( new_tr.innerHTML += `  <tr id="${idx}">
    //     <td>${student.ID}</td>
    //     <td>${student.name}</td>
    //     <td>${student.email}</td>
    //     <td>${student.age}</td>
    //     <td>${student.grade}</td>
    //     <td class="degree">
    //         <div>${student.degree}</div>
    //         <div id="icon">
    //             <span class="material-icons">delete</span>
    //             <span class="material-icons">add_task</span>

    //         </div>
    //     </td>
    // </tr>` )
    // })


    let table = document.getElementById("table_body");

    while (table.hasChildNodes()) {
        // table.removeChild(table.firstChild);
        table.removeChild(table.childNodes[0]);

    }

    table.value= "";

    student_arr.forEach((student) => {

        let row = document.createElement("tr");

        let id = document.createElement("td");
        let name = document.createElement("td")
        let email = document.createElement("td");
        let age = document.createElement("td");
        let grade = document.createElement("td");
        let degree = document.createElement("td");

        let keys = Object.keys(student);

        keys.forEach((key) => {

            if (key == "ID") {
                id.innerHTML = student["ID"];

            } else if (key == "name") {
                name.innerHTML = student["name"];
            }
            else if (key == "age") {
                age.innerHTML = student["age"];
            }
            else if (key == "grade") {
                grade.innerHTML = student["grade"];
            }
            else if (key == "email") {
                email.innerHTML = student["email"];
            }
            else {
                degree.innerHTML = `<div>${student[key]}</div>
                <div >
               <a onclick="edit(${student['ID']})" class='fa'>&#xf044;</a>
               <a onClick="del(${student['ID']})" class='fa'>&#xf1f8;</a> 
               </div> `;

            }

            
            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(age);
            row.appendChild(grade);
            row.appendChild(degree)

        })

        table.appendChild(row)
    })
}


function edit(id) {

    document.getElementById("submit").innerText = "Edit Student";
    document.getElementById("submit").style.backgroundColor = "black";
    document.getElementById("submit").style.color = "white";

    student_arr.forEach((student) => {

        if (student["ID"] == id) {
            document.getElementById("username_inp").value = student["name"];
            document.getElementById("email_inp").value = student["email"];
            document.getElementById("GPA_inp").value = student["grade"];
            document.getElementById("age_inp").value = student["age"];
            document.getElementById("degree_inp").value = student["degree"];


            document.getElementById("submit").onclick = function myFunction() {

                student['name'] = document.getElementById("username_inp").value;
                student['email'] = document.getElementById("username_inp").value;
                student['age'] = document.getElementById("age_inp").value;
                student['grade'] = document.getElementById("GPA_inp").value;
                student['degree'] = document.getElementById("degree_inp").value;

                document.getElementById("username_inp").value = "";
                document.getElementById("username_inp").value = "";
                document.getElementById("age_inp").value = "";
                document.getElementById("GPA_inp").value = "";
                document.getElementById("degree_inp").value = "";

                document.getElementById("submit").innerText = "Add Student";

                showTable();
            }

        }
    })

}

function del(id){
    student_arr.forEach((student, idx)=>{
        if(student["ID"]== id){
            student_arr.splice(idx , 1);
            showTable();
        }
    })
}



function search() {
    var input, filter, table, tr, td, i, txtValue, txtValue1, txtValue2;
    input = document.getElementById("serching");
    filter = input.value.toUpperCase();
    table = document.getElementById("table_body");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        td1 = tr[i].getElementsByTagName("td")[2];
        td2 = tr[i].getElementsByTagName("td")[5];

        if (td || td1 || td2) {
            txtValue = td.textContent || td.innerText;
            txtValue1 = td1.textContent || td1.innerText;
            txtValue2 = td2.textContent || td2.innerText;

            if (txtValue.toUpperCase().indexOf(filter)  !=-1 || txtValue1.toUpperCase().indexOf(filter) !=-1 || txtValue2.toUpperCase().indexOf(filter) != -1) {
                tr[i].style.display = "";
            }

            else {
                tr[i].style.display = "none";
            }

        }
    }
}




window.onload = () => {
    student_arr = JSON.parse(localStorage.getItem("student_arr")) || [];
    count = student_arr.reduce(
        (max, student) => Math.max(max, student.ID), 0);
    showTable();
};

window.onbeforeunload = () => {
    localStorage.setItem("student_arr" ,JSON.stringify(student_arr));
};