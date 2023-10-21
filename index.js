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

const adminId = document.getElementById("adminId");
let adminDetails = localStorage.getItem("admin");
adminDetails = JSON.parse(adminDetails);
const bearerToken = adminDetails.token;


function dashboardApi() {
    const getModal = document.querySelector('.pagemodal');
    getModal.style.display= "block";
    
    adminId.innerText = `Hello ${adminDetails.name}!`;

    //Get dashboard details
    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi"; 

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const getCategory = document.getElementById('category');
        const getLearnmat = document.getElementById('learnmat');
        const getSubcat = document.getElementById('subCat');
        const getQuiz = document.getElementById('quiz');
        const getStudents = document.getElementById('student');

        getCategory.innerText = data['total_number_of_categories'
        ];
        getLearnmat.innerText = data['total_number_of_learningmaterial'
        ];
        getSubcat.innerText = data['total_number_of_subcategories'
        ];
        getQuiz.innerText = data['total_number_of_quize'
        ];
        getStudents.innerText = data['total_number_of_students'
        ];
        getModal.style.display= "none";
    })
    .catch(error => console.error('Error:', error));
    
    //get all students
    const url2 = "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students"; 
    
    fetch(url2, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        result = localStorage.setItem("allStudents",JSON.stringify(result));

        //get all student details to dashboard

        let allStudentDts = localStorage.getItem("allStudents");
        allStudentDts = JSON.parse(allStudentDts);
        const studentTable = document.getElementById('table-id');
        if (allStudentDts.length === 0) {
            studentTable.innerHTML = "No Records Found";
            getModal.style.display= "none";
            
        } else {
            getModal.style.display= "none";

            allStudentDts.map(item => {
            studentTable.innerHTML += `<tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.phone_number}</td>
            <td>${item.position}</td>
            <td>${item.total_score}</td>
            </tr>`
        })} 
    })
    .catch(error => console.error('Error:', error));
}

   //Get top 3 students
    function studentModal(event) {
        event.preventDefault;
        const studentModal = document.querySelector('.mymodal');
        studentModal.style.display= "block";

        const url1 = "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students"; 

        fetch(url1, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            const topThree = localStorage.setItem("tpThree",JSON.stringify(result));
            let topDetails = localStorage.getItem("tpThree");
            topDetails = JSON.parse(topDetails);
            let studentDetails = document.querySelector('.allstudent');

            if (result.length === 0) {
                studentDetails.innerHTML = "No Records Found";
            } else {
                result.map(item => {
                studentDetails.innerHTML += `
                <div class="search-card">
                <div class="d-flex justify-content-between">
                <h5 class="mt-3">Image:</h5>
                <img src=${item.image} alt="img" class="w-25"/>
                </div>
                <div class="d-flex justify-content-between">
                <h5>Name:</h5>
                <p>${item.name}</p>
                </div>
                <div class="d-flex justify-content-between">
                <h5>Email:</h5>
                <p>${item.email}</p>
                </div>
                <div class="d-flex justify-content-between">
                <h5>Phone Number:</h5>
                <p>${item.phone_number}</p>
                </div>
                <div class="d-flex justify-content-between">
                <h5>Position:</h5>
                <p>${item.position}</p>
                </div>
                <div class="d-flex justify-content-between">
                <h5>Total Score:</h5>
                <p>${item.total_score}</p>
                </div>
            </div>`
                })
            }
        })
        .catch(error => console.error('Error:', error));
    
    }
    function closeDashModal() {
        const studentModal = document.querySelector('.mymodal');
        studentModal.style.display= "none";
    }




