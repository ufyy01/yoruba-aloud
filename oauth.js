//Get dashboard details
    const adminId = document.getElementById("adminId");
    let adminDetails = localStorage.getItem("admin");
    adminDetails = JSON.parse(adminDetails);
    
    const bearerToken = adminDetails.token;

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
    })
    .catch(error => console.error('Error:', error));

//Get top 3 students
const url1 = "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students"; 

fetch(url1, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    const topThree = localStorage.setItem("tpThree",JSON.stringify(data));
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
.then(data => {
    const allStudents = localStorage.setItem("allStudents",JSON.stringify(data));
})
.catch(error => console.error('Error::', error));
