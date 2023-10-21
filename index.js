function signUp(event) {
    event.preventDefault();
    
    let getSpin = document.querySelector('.spin');
    getSpin.style.display = "inline-block";

    const getName = document.getElementById('name').value;
    const getEmail = document.getElementById('email').value;
    const getPassword = document.getElementById('password').value;
    const getConfirmPassword = document.getElementById('confirmPassword').value;

    if (getName === "" || getEmail === "" || getPassword === "" || getConfirmPassword === "") {
        Swal.first({
            icon: 'info',
            text: 'All fields are Required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }
    if (getConfirmPassword !== getPassword) {
        Swal.fire({
            icon: 'info',
            text: 'Passwords do not match',
            confirmButtonColor: '#2D85DE'  
        })
        getSpin.style.display = "none";
    }
    else {
        const signData = new FormData();
        signData.append("name", getName);
        signData.append("email", getEmail);
        signData.append("password", getPassword);
        signData.append("password_confirmation", getConfirmPassword);

        const signMethod = {
            method: 'POST',
            body: signData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/register_admin";

        fetch(url, signMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: "#2D85DE"
                })

                setTimeout(() => {
                    location.href = "index.html"
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message.email[0]}`,
                    confirmButtonColor: "#2D85DE"
                })
                getSpin.style.display = "none"
            }
        })
        .catch(error => {
            console.log('error', error)
            Swal.fire({
                icon: 'info',
                text: `${result.message}`,
                confirmButtonColor: "#2D85DE"
            })
            getSpin.style.display = "none"
        });

    }

}

// login function
function logIn(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const getEmail = document.getElementById("email").value;
    const getPassword = document.getElementById("password").value;

    if (getEmail === "" || getPassword === "") {
        Swal.fire({
            icon: "info",
            text: "All Fields are Required!",
            confirmButtonColor: "#2D85DE"
        })
        getSpin.style.display = "none"
    }
    else {
        const signData = new FormData();
        signData.append("email", getEmail);
        signData.append("password", getPassword);

        const signMethod = {
            method: 'POST',
            body: signData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";

        fetch(url, signMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("admin", JSON.stringify(result))

            if (result.hasOwnProperty("email")) {
                location.href = "dashboard.html"
            }
            else {
                Swal.fire({
                    icon: "info",
                    text: "Login Unsuccessful!",
                    confirmButtonColor: "#2D85DE"

                })
                getSpin.style.display = "none"
            }
        })
        .catch(error => console.log('error', error));
    }
}

// Dashboard on load
function dashboardApi() {
    const adminId = document.getElementById("adminId");
    let adminDetails = localStorage.getItem("admin");
    adminDetails = JSON.parse(adminDetails);
    adminId.innerText = `Hello ${adminDetails.name}!`;
}


function studentModal(event) {
    event.preventDefault;
    const studentModal = document.querySelector('.mymodal');
    studentModal.style.display= "block";

    let topDetails = localStorage.getItem("tpThree");
    topDetails = JSON.parse(topDetails);
    
    let studentDetails = document.querySelector('.allstudent');
    for (let i = 0; i < topDetails.length; i++){
        studentDetails.innerHTML += `<h5>
        Name: ${topDetails[i].name} <br> email: ${topDetails[i].email} <br> 
        Phone number: ${topDetails[i]['phone_number']} <br> 
        Position: ${topDetails[i].position}</td> <br> 
        Total Score: ${topDetails[i]['total_score']}
    </h5>`
    }  
}
function closeDashModal() {
    const studentModal = document.querySelector('.mymodal');
    studentModal.style.display= "none";
}

//get all student details to dashboard
let allStudentDts = localStorage.getItem("allStudents");
allStudentDts = JSON.parse(allStudentDts);
    for (let i=0; i <= allStudentDts.length; i++) {
        const studentTable = document.getElementById('table-id');
        studentTable.innerHTML += `<tr>
        <td>${allStudentDts[i].name}</td>
        <td>${allStudentDts[i].email}</td>
        <td>${allStudentDts[i]['phone_number']}</td>
        <td>${allStudentDts[i].position}</td>
        <td>${allStudentDts[i]['total_score']}</td>
        </tr>`
    }
   
    

