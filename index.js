function signUp(event) {
    event.preventDefault();
    
    let getSpin = document.querySelector('.spin');
    getSpin.style.display = "inline-block";

    const getName = document.getElementById('name').value;
    const getEmail = document.getElementById('email').value;
    const getPassword = document.getElementById('password').value;
    const getConfirmPassword = document.getElementById('confirmPassword').value;

    if (getName === "" || getEmail === "" || getPassword === "" || getConfirmPassword === "") {
        Swal.fire({
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
            localStorage.setItem("admin", JSON.stringify(result));

            if (result.hasOwnProperty("email")) {
                location.href = "dashboard.html"
            }
            else {
                Swal.fire({
                    icon: "info",
                    text: `${result.message}`,
                    confirmButtonColor: "#2D85DE"
                })
                getSpin.style.display = "none"
            }
        })
        .catch(error => console.log('error', error));
    }
}

// Dashboard on load
function getBearerToken(){
    const adminId = document.getElementById("adminId");
    let adminDetails = localStorage.getItem("admin");
    adminDetails = JSON.parse(adminDetails);
    const bearerToken = adminDetails.token;
    return bearerToken;
}



function dashboardApi() {
    const getModal = document.querySelector('.pagemodal');
    getModal.style.display= "block";
    
    const adminId = document.getElementById("adminId");
    let adminDetails = localStorage.getItem("admin");
    adminDetails = JSON.parse(adminDetails);
    adminId.innerText = `Hello ${adminDetails.name}!`;

    //Get dashboard details
    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi"; 

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getBearerToken()}`,
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
            'Authorization': `Bearer ${getBearerToken()}`,
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
    const studentModal = document.querySelector('#dash-modal');
    studentModal.style.display= "none";
}


function tabledataApi() {

    const getModal = document.querySelector('.pagemodal');
    getModal.style.display= "block";

    //get all students
    const url2 = "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students"; 
    
    fetch(url2, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getBearerToken()}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
      
        const studentTable = document.getElementById('table-id');
        if (result.length === 0) {
            studentTable.innerHTML = "No Records Found";
            getModal.style.display= "none";
            
        } else {
            getModal.style.display= "none";

            result.map(item => {
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


//Create category

function createCategory(event) {
    event.preventDefault;

    const getSpin = document.querySelector('.spin');
    getSpin.style.display = "inline-block";

    const catName = document.forms['catForm'].querySelector('#cat').value;
    const catImg = document.forms['catForm'].querySelector('#imcat');
    const catImgFile = catImg.files[0];


    if (catName === '') {
        Swal.fire({
            icon: 'info',
            text: 'All fields are Required!',
            confirmButtonColor: '#2D85DE'
        })

        getSpin.style.display = "none";
    } else {
        const getHeader = new Headers();
        getHeader.append('Authorization', `Bearer ${getBearerToken()}`);
        
        const catData = new FormData();
        catData.append("name", catName);
        catData.append("image", catImgFile);

        const catMethod = {
            method: 'POST',
            headers: getHeader,
            body: catData
        }

        const url = 'https://pluralcodesandbox.com/yorubalearning/api/admin/create_category';

        fetch(url, catMethod)
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
                    location.reload();
                }, 2000)

                getSpin.style.display = "none"
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message.image}`,
                    confirmButtonColor: "#2D85DE"
                })
                getSpin.style.display = "none"
            }
        })
        .catch(error => {
            console.error('Error:', error);
        })
    }
    
}

//category list scroll
function getCategoryList() {
    const scrollObj = document.querySelector('.scroll-object');

    let data = [];

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/category_list"; 

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getBearerToken()}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        
        if (result.length == 0) {
            scrollObj.innerHTML = "No category found"
        } else {
            result.map(item => {
                data += `
                <div class="search-card">
                <a href="details.html?id=${item.id}&name=${item.name}"><img src="${item.image}" alt="category image"/></a>
                <h2 class="my-3">${item.name}</h2>
                <div class="text-right">
                <button type="button" class="update-button" onclick="modalBox(${item.id})">Update</button>
                <button type="button" class="delete-button" onclick="deleteCat(${item.id})">Delete</button>
                </div>
                
                </div>`

                scrollObj.innerHTML = data;
                
            })
        }
        
    })
    .catch(error => {
        console.log('Error:', error)
    })
}


// Update button
let globalId;

function modalBox(catId) {
    const showModal = document.getElementById("my-modal");
    showModal.style.display = "block"

    globalId = catId;   

    console.log(globalId)
    
    const getUpName = document.getElementById("updateName");

    const getHeader = new Headers();
    getHeader.append('Authorization', `Bearer ${getBearerToken()}`);
    

    const catMethod = {
        method: 'GET',
        headers: getHeader
    }
    
    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?category_id=${catId}`;

    fetch(url, catMethod)
    .then(response => response.json())
    .then(result => {
        getUpName.setAttribute("value", `${result.name}`);
    })
    .catch(error => {
        console.log('Error:', error)
    })
}

function closeModal3() {
        const showModal = document.getElementById('my-modal');
        showModal.style.display = "none";
}

function updateCategory(event) {
        event.preventDefault();
        const getSpin = document.querySelector(".spin2");
        getSpin.style.display = "inline-block";
        const catName = document.getElementById("updateName").value;
        const catImage = document.getElementById("updateImage").files[0];
        if (catName === "") {
            Swal.fire({
                icon: 'info',
                text: 'All Fields Required!',
                confirmButtonColor: '#2D85DE'
            })
            getSpin.style.display = "none";
        }
        else {
            const dashHeader = new Headers();
            dashHeader.append("Authorization", `Bearer ${getBearerToken()}`);

            const catData = new FormData();
            catData.append("name", catName);
            catData.append("image", catImage);
            catData.append("category_id", globalId)
            
            const dashMethod = {
                method: 'POST',
                headers: dashHeader,
                body: catData
            }
            const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/update_category";
            fetch(url, dashMethod)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status === "success") {
                    Swal.fire({
                        icon: 'success',
                        text: `${result.message}`,
                        confirmButtonColor: '#2D85DE'
                    })
                    setTimeout(() => {
                        location.reload();
                    }, 3000)
                }
                else {
                    Swal.fire({
                        icon: 'info',
                        text: `${result.status}`,
                    })
                    getSpin.style.display = "none";
                }
            })
            .catch(error => console.log('error', error));
        }
}

// Delete button

function deleteCat(catIdDel) {
    Swal.fire({
        icon: 'question',
        text: 'Are you sure you want to delete category?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#2D85DE'
    })
    .then(result => {
        if (result.isConfirmed){

            const dashHeader = new Headers();
            dashHeader.append("Authorization", `Bearer ${getBearerToken()}`);

            const dashMethod = {
                method: 'GET',
                headers: dashHeader,
            }

            const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/delete_category/${catIdDel}`;

            fetch(url, dashMethod)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status === "success") {
                    Swal.fire({
                        icon: 'success',
                        text: `${result.message}`,
                        confirmButtonColor: '#2D85DE'
                    })
                    setTimeout(() => {
                        location.reload();
                    }, 4000)
                }
                else {
                    Swal.fire({
                        icon: 'info',
                        text: `${result.status}`,
                        confirmButtonColor: '#2D85DE'
                    })
                }
            })
            .catch(error => console.log('error', error));
            }
        } )
 
}

//Category Detail Page

function getNameDetails(){
    const params = new URLSearchParams(window.location.search);
    let getName = params.get('name');
    let catName = document.querySelector('.det');
    catName.innerText =  getName;
}

function subCategory(event) {
    event.preventDefault;

    const params = new URLSearchParams(window.location.search);
    let getId = params.get('id');

    const getSpin = document.querySelector('.spin');
    getSpin.style.display = "inline-block";

    const subCatName = document.getElementById('subCatName').value;
    const subCatImg = document.getElementById('subCatImg').files[0];


    if (subCatName === '') {
        Swal.fire({
            icon: 'info',
            text: 'All fields are Required!',
            confirmButtonColor: '#2D85DE'
        })

        getSpin.style.display = "none";
    } else {
        const getHeader = new Headers();
        getHeader.append('Authorization', `Bearer ${getBearerToken()}`);
        
        const catData = new FormData();
        catData.append("name", subCatName);
        catData.append("image", subCatImg);
        catData.append("category_id", getId)

        const catMethod = {
            method: 'POST',
            headers: getHeader,
            body: catData
        }

        const url = 'https://pluralcodesandbox.com/yorubalearning/api/admin/create_subcategory';

        fetch(url, catMethod)
        .then(response => response.json())
        .then(result => {
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: "#2D85DE"
                })
                setTimeout(() => {
                    location.reload();
                }, 2000)

                getSpin.style.display = "none"
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message.image}`,
                    confirmButtonColor: "#2D85DE"
                })
                getSpin.style.display = "none"
            }
        })
        .catch(error => {
            console.error('Error:', error);
        })
    }
}

// subcategory list

function getSubcategoryList() {
    const getModal = document.querySelector('.pagemodal');
    getModal.style.display= "block";

    const params = new URLSearchParams(window.location.search);
    let getId = params.get('id');

    const subcatRow = document.querySelector('div.row');

    let data = [];

    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/category_details/${getId}`; 

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getBearerToken()}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.length === 0) {
            subcatRow.innerHTML = `<h2 class="text-center">No subcategory found!</h2>`;
            getModal.style.display= "none";

        } else {
            result.map(item => {
                data += `
                <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <div class="search-card">
                <img src="${item.image}" alt="category image" class="img-fluid"/>
                <p class="my-3">${item.name}</p>
                <div class="text-right">
                <button type="button" class="update-button" onclick="modalSubcat(${item.id})">Update</button>
                </div>
                </div>
                </div>`

                subcatRow.innerHTML = data;
                getModal.style.display= "none";
            })
        }
        
    })
    .catch(error => {
        console.log('Error:', error)
    })
}

let globalSubId;
//Modal to update category liist
function modalSubcat(subcatId) {
    globalSubId = subcatId;
    console.log(globalSubId);
    const showModal = document.getElementById("my-modal-mode");
    showModal.style.display = "block"
    
    const updateSubName = document.getElementById("updateSubName");

    const getHeader = new Headers();
    getHeader.append('Authorization', `Bearer ${getBearerToken()}`);
    

    const catMethod = {
        method: 'GET',
        headers: getHeader
    }
    
    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?subcategory_id=${subcatId}`;

    fetch(url, catMethod)
    .then(response => response.json())
    .then(result => {
        updateSubName.setAttribute("value", `${result.name}`);
    })
    .catch(error => {
        console.log('Error:', error)
    })
}

//Close update subcategory modal 
function closeModalMode() {
    const showModal = document.getElementById("my-modal-mode");
    showModal.style.display = "none"
}

//Updating subcategory
function updateSubCategory(event) {
    event.preventDefault();

    console.log(globalSubId);

    const getSpin = document.querySelector(".spin2");
        getSpin.style.display = "inline-block";

        const updateSubName = document.getElementById("updateSubName").value;
        const updateSubImage = document.getElementById("updateSubImage").files[0];

        if (updateSubName === "") {
            Swal.fire({
                icon: 'info',
                text: 'All Fields Required!',
                confirmButtonColor: '#2D85DE'
            })
            getSpin.style.display = "none";
        }
        else {
            const dashHeader = new Headers();
            dashHeader.append("Authorization", `Bearer ${getBearerToken()}`);

            const subcatData = new FormData();
            subcatData.append("name", updateSubName);
            subcatData.append("image", updateSubImage);
            subcatData.append("subcategory_id", globalSubId)
            
            const dashMethod = {
                method: 'POST',
                headers: dashHeader,
                body: subcatData
            }
            const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/update_subcategory";
            
            fetch(url, dashMethod)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status === "success") {
                    Swal.fire({
                        icon: 'success',
                        text: `${result.message}`,
                        confirmButtonColor: '#2D85DE'
                    })
                    setTimeout(() => {
                        location.reload();
                    }, 3000)
                }
                else {
                    Swal.fire({
                        icon: 'info',
                        text: `${result.status}`,
                    })
                    getSpin.style.display = "none";
                }
            })
            .catch(error => console.log('error', error));
        }
}

// updating admin details
function upDateAdmin(event) {
    event.preventDefault();
    const getSpin = document.querySelector(".spin2");
    getSpin.style.display = "inline-block";
    const updateName = document.getElementById("updateName").value;
    const updateEmail = document.getElementById("updateEmail").value;
    if (updateName === "" || updateEmail === "") {
        Swal.fire({
            icon: 'info',
            text: 'All Fields Required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }
    else {
        const getToken = localStorage.getItem("admin");
        const myToken = JSON.parse(getToken);
        const token = myToken.token;
        const dashHeader = new Headers();
        dashHeader.append("Authorization", `Bearer ${token}`);
        const catData = new FormData();
        catData.append("name", updateName);
        catData.append("email", updateEmail);
        const dashMethod = {
            method: 'POST',
            headers: dashHeader,
            body: catData
        }
        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_update_profile";
        fetch(url, dashMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
                setTimeout(() => {
                    localStorage.clear();
                    location.href = "index.html"
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
}
function upDatePassword(event) {
    event.preventDefault();
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";
    const currentEmail = document.getElementById("updatePassEmail").value;
    const newPass = document.getElementById("updatePassword").value;
    const newConfirmPass = document.getElementById("confirmPassword").value;
    if (currentEmail === "" || newPass === "" || newConfirmPass === "") {
        Swal.fire({
            icon: 'info',
            text: 'All Fields Required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }
    if (newConfirmPass !== newPass) {
        Swal.fire({
            icon: 'info',
            text: 'New password do not match',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }
    else {
        const getToken = localStorage.getItem("admin");
        const myToken = JSON.parse(getToken);
        const token = myToken.token;
        const dashHeader = new Headers();
        dashHeader.append("Authorization", `Bearer ${token}`);
        const catData = new FormData();
        catData.append("email", currentEmail);
        catData.append("password", newPass);
        catData.append("password_confirmation", newConfirmPass);
        const dashMethod = {
            method: 'POST',
            headers: dashHeader,
            body: catData
        }
        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_update_password";
        fetch(url, dashMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
                setTimeout(() => {
                    localStorage.clear();
                    location.href = "index.html"
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
}

// Learning material category dropdown
function dropdownCat() {
    const dropdownCont = document.querySelector("#nav-list");
    let data = [];

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/categorylist_dropdown"; 

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getBearerToken()}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.length === 0) {
            dropdownCont.innerText = `No categories found`;
        }
        else {
            result.forEach((object) => {
            
                data += `<h5>${object.parent_category.name}</h5>`;
        
                object.sub_category.forEach((element) => {
                    data += `<p class="subcat" onclick="getMaterialId(${element.id})">${element.name}</p>
                    <hr>`;
                });
            });
            dropdownCont.innerHTML = data;
        }
    })
    .catch(error => {
        console.log('Error:', error)
    })
}
function getMaterialId(matId) {
    const matSubId = localStorage.setItem("matId", matId);
    let catId = localStorage.getItem("matId");
    subCatId = JSON.parse(catId);
    
    Swal.fire({
        icon: 'success',
        text: "Subcategory selected",
        confirmButtonColor: "#2D85DE"
    })

    const learningMatCont = document.querySelector(".overboard");

    let data = [];

    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/list_all_learning_materials?subcategory_id=${subCatId}&limit=2&skip=2`; 

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getBearerToken()}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            learningMatCont.innerHTML = `<h5 class="my-5 text-center"> No learning material available for seleted subcategory.<br>
            Click the create materials button to create a learning material</h5>`;

            console.log(learningMatCont)
        }
        else {
            result.map(item => {
                if (item.type === "reading") {
                    data += `
                    <div class="searchcard">
                    <img src="${item.image_file}" alt="learning material" class="searchcard-img my-3" >
                    <div class="searchcard-info">
                    <p> Word in English: ${item.reading_word_in_english}</p>
                    <hr>
                    <p> Word in Yoruba: ${item.reading_word_in_yoruba}</p>
                    <hr>
                    <audio controls>
                    <source scr="${item.audio_file}" type="audio/mp3">
                    </audio>
                    </div>
                    <div class="text-center mb-3">
                    <button class="update-button" onclick="readingModal(${item.id})">Update</button>
                    <button class="delete-button" onclick="deleteRead(${item.id})">Delete</button>
                    </div>
                    </div>
                    `
                }
                if (item.type === "default") {
                    data += `
                    <div class="searchcard">
                    <img src="${item.image_file}" alt="learning material" class="searchcard-img my-3" >
                    <div class="searchcard-info">
                    <p>Title: ${item.title}</p>
                    <hr>
                    <audio controls>
                    <source scr="${item.audio_file}" type="audio/mp3">
                    </audio>
                    </div>
                    <div class="text-center mb-3">
                    <button class="update-button" onclick="readingModal(${item.id})">Update</button>
                    <button class="delete-button" onclick="deleteRead(${item.id})">Delete</button>
                    </div>
                    </div>
                    `
                }
                if (item.type === "conversation") {
                    data += `
                    <div class="searchcard">
                    <img src="${item.image_file}" alt="learning material" class="searchcard-img my-3" >
                    <div class="searchcard-info">
                    <p> Question in Yoruba: ${item.conversation_yoruba_question}</p>
                    <hr>
                    <p> Question in English: ${item.conversation_english_question}</p>
                    <hr>
                    <p> Answer in Yoruba: ${item.conversation_yoruba_answer}</p>
                    <hr>
                    <p> Answer in English ${item.conversation_english_answer}</p>
                    <hr>
                    <p>Question</p>
                    <audio controls>
                    <source scr="${item.conversation_audio_question_inyoruba}" type="audio/mp3">
                    </audio>
                    <hr>
                    <p>Answer</p>
                    <audio controls>
                    <source scr="${item.conversation_audio_answer_inyoruba}" type="audio/mp3">
                    </audio>
                    </div>
                    <div class="text-center mb-3">
                    <button class="update-button" onclick="readingModal(${item.id})">Update</button>
                    <button class="delete-button" onclick="deleteRead(${item.id})">Delete</button>
                    </div>
                    </div>
                    `
                }
            })
            

            learningMatCont.innerHTML = data;
        
        }
    })
    .catch(error => console.log("error", error));
}

//display learning materials modal
function displayLearnModal() {
    const learnModal = document.querySelector('#my-modal');
    learnModal.style.display = "block";
}
function closeModal2() {
    const learnModal = document.querySelector('#my-modal');
    learnModal.style.display = "none"; 
}

// Displaying customized form input
function defaultLearning() {

    const defaultForm = document.querySelector('.myDefault');
    defaultForm.style.display = "block";
    const readingForm = document.querySelector('.myReading');
    readingForm.style.display = "none";
    const convaForm = document.querySelector('.myConversation');
    convaForm.style.display = "none";

    let defaultBtn = document.querySelector('.default');
    let readBtn = document.querySelector('.reading');
    let convaBtn = document.querySelector('.conversation');

    if (defaultForm.style.display === "block") {
        defaultBtn.style.background = "#2D85DE";
        defaultBtn.style.color = "#fff";
        readBtn.style.background = "#fff";
        readBtn.style.color = "#2D85DE";
        convaBtn.style.background = "#fff";
        convaBtn.style.color = "#2D85DE";
    }
    
}
function reading() {
    const defaultForm = document.querySelector('.myDefault');
    defaultForm.style.display = "none";
    const convaForm = document.querySelector('.myConversation');
    convaForm.style.display = "none";
    const readingForm = document.querySelector('.myReading');
    readingForm.style.display = "block";

    let defaultBtn = document.querySelector('.default');
    let readBtn = document.querySelector('.reading');
    let convaBtn = document.querySelector('.conversation');

    if (readingForm.style.display === "block") {
        readBtn.style.background = "#2D85DE";
        readBtn.style.color = "#fff";
        defaultBtn.style.background = "#fff";
        defaultBtn.style.color = "#2D85DE";
        convaBtn.style.background = "#fff";
        convaBtn.style.color = "#2D85DE";
    }
}
function conversation() {
    const defaultForm = document.querySelector('.myDefault');
    defaultForm.style.display = "none";
    const readingForm = document.querySelector('.myReading');
    readingForm.style.display = "none";
    const convaForm = document.querySelector('.myConversation');
    convaForm.style.display = "block";

    let defaultBtn = document.querySelector('.default');
    let readBtn = document.querySelector('.reading');
    let convaBtn = document.querySelector('.conversation');

    if (convaForm.style.display === "block") {
        defaultBtn.style.background = "#fff";
        defaultBtn.style.color = "#2D85DE";
        readBtn.style.background = "#fff";
        readBtn.style.color = "#2D85DE";
        convaBtn.style.background = "#2D85DE";
        convaBtn.style.color = "#fff";
    }
}  

//Create Default learning material
function createDefaultLearning(event) {
    event.preventDefault();
    const defaultName = document.querySelector("#title").value;
    const defaultImage = document.querySelector("#img1").files[0];
    const defaultAudio = document.querySelector("#audio").files[0];

    const defaultSpin = document.querySelector(".spin");
    defaultSpin.style.display = "inline-block";

    let catId = localStorage.getItem("matId");
    subCatId = JSON.parse(catId);
    console.log(subCatId);

    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${getBearerToken()}`);

    const formdata = new FormData();
    formdata.append("title", defaultName);
    formdata.append("image", defaultImage);
    formdata.append("audio", defaultAudio);
    formdata.append("subcategory_id", subCatId);

    const requestOptions = {
        method: 'POST',
        headers: myHeader,
        body: formdata
    };

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_defaultlearning";

    if (defaultName === "") {
        Swal.fire({
            icon: 'info',
            text: "All Fields Required",
            confirmButtonColor: '#2D85DE'
        }) 
        defaultSpin.style.display = "none";
    }
    else {
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
        console.log(result)
        if (result.status === "success") {
            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#2D85DE'
            })
            defaultSpin.style.display = "none";
            setTimeout(() => {location.reload()}, 3000)
        }
        else{
            Swal.fire({
                icon: 'info',
                text: `${result.status}`,
                confirmButtonColor: '#2D85DE'
            })
            defaultSpin.style.display = "none";
        }
        })
        .catch(error => console.log('error', error));
    }
}


function createReadingMat(event) {
    event.preventDefault();

    const englishText = document.getElementById("englishText").value;
    const yorubaText = document.getElementById("yorubaText").value;
    const readingImg = document.getElementById("img2").files[0];
    const readingAud = document.getElementById("audio2").files[0];

    const defaultSpin = document.getElementById('sspin');
    defaultSpin.style.display = "inline-block";

    let subCatId = localStorage.getItem("matId");
    subCatId = JSON.parse(subCatId);
    console.log(subCatId);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getBearerToken()}`);

    const formdata = new FormData();
    formdata.append("words_in_english", englishText);
    formdata.append("words_in_yoruba", yorubaText);
    formdata.append("image", readingImg);
    formdata.append("audio", readingAud);
    formdata.append("subcategory_id", subCatId);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
    };

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_readingmaterial";

    if (englishText === "" || yorubaText === "" ) {
        Swal.fire({
            icon: 'info',
            text: "All Fields Required",
            confirmButtonColor: '#2D85DE'
        }) 
        defaultSpin.style.display = "none";

        setTimeout(() => {location.reload()}, 3000)

    }
    else {
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
                defaultSpin.style.display = "none";
            }else{
                Swal.fire({
                icon: 'info',
                text: `${result.status}`,
                confirmButtonColor: '#2D85DE'
                })
                defaultSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
}

 function createConversation(event) {
    event.preventDefault();

    const englishQuest = document.getElementById("englishQues").value;
    const yorubaQuest = document.getElementById("yorubaQues").value;
    const englishAns = document.getElementById("englishAns").value;
    const yorubaAns = document.getElementById("yorubaAns").value;
    const yorubaAudQues = document.querySelector("#audio3").files[0];
    const yorubaAudAns = document.querySelector("#audio4").files[0];
    const yorubaImg = document.querySelector("#img3").files[0];

    const defaultSpin = document.getElementById('spinn');
    defaultSpin.style.display = "inline-block";

    let subCatId = localStorage.getItem("matId");
    matCatId = JSON.parse(subCatId);
    console.log(matCatId);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getBearerToken()}`);

    const formdata = new FormData();
    formdata.append("conversation_english_question", englishQuest);
    formdata.append("conversation_yoruba_question", yorubaQuest);
    formdata.append("conversation_english_answer", englishAns);
    formdata.append("conversation_yoruba_answer", yorubaAns);
    formdata.append("conversation_audio_question_inyoruba", yorubaAudQues);
    formdata.append("conversation_audio_answer_inyoruba", yorubaAudAns);
    formdata.append("subcategory_id", matCatId);
    formdata.append("image", yorubaImg);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
    };

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_learningconversation";

    if (englishQuest === "" || yorubaQuest === "") {
        Swal.fire({
            icon: 'info',
            text: "All Fields Required",
            confirmButtonColor: '#2D85DE'
        }) 
        defaultSpin.style.display = "none";
    }
    else {
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.status}`,
                    confirmButtonColor: '#2D85DE'
                })
                defaultSpin.style.display = "none";

                setTimeout(() => {location.reload()}, 3000)

            }else{
                Swal.fire({
                icon: 'info',
                text: `${result.status}`,
                confirmButtonColor: '#2D85DE'
                })
                defaultSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
 }

//  function getLearningMat() {
//     const learningMatCont = document.querySelector(".overboard");
//     learningMatCont.style.backgroundColor = "pink";
//     console.log(learningMatCont)

//     let data = [];

//     const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/list_all_learning_materials?subcategory_id=${subCatId}&limit=2&skip=2`; 

//     fetch(url, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${getBearerToken()}`,
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(result => {
//         console.log(result)
//         if (result.lenght === 0) {
//             learningMatCont.innerText = "No learning material available. Click the create material button to create a learning material"
//         }
//         else {
//             if (result.type === "reading") {
//                 result.map(item => {
//                     data += `
//                     <div class="searchcard">
//                     <img src="${item.image_file}" alt="learning material" class="searchcard-img" >
//                     <div class="searchcard-info">
//                     <p>${item.reading_word_in_english}</p>
//                     <hr>
//                     <p>${item.reading_word_in_yoruba}</p>
//                     <audio controls>
//                     <source scr="${item.audio_file}" type="audio/mp3">
//                     </audio>
//                     </div>
//                     <button class="update-button" onclick="readingModal(${item.id})">Update</button>
//                     <button class="delete-button" onclick="deleteRead(${item.id})">Delete</button>
//                     </div>
//                     `
//                 })

//                 learningMatCont.innerHTML = data;
//             }
//             if (result.type === "") {
//                 result.map(item => {
//                     data += `
//                     <div class="searchcard">
//                     <img src="${item.image_file}" alt="learning material" class="searchcard-img" >
//                     <div class="searchcard-info">
//                     <p>${item.reading_word_in_english}</p>
//                     <hr>
//                     <p>${item.reading_word_in_yoruba}</p>
//                     <audio controls>
//                     <source scr="${item.audio_file}" type="audio/mp3">
//                     </audio>
//                     </div>
//                     <button class="update-button" onclick="readingModal(${item.id})">Update</button>
//                     <button class="delete-button" onclick="deleteRead(${item.id})">Delete</button>
//                     </div>
//                     `
//                 })
//         }
        
//         }
//     })
//     .catch(error => console.log("error", error));
// }

function gotoLoginPage(event) {
    event.preventDefault;
    location.href = "index.html";
}

function logout() {
    localStorage.clear();
    location.href= "index.html";
}
