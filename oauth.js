const getCategory = document.getElementById('category');
    const getLearnmat = document.getElementById('learnmat');
    const getSubcat = document.getElementById('subCat');
    const getQuiz = document.getElementById('quiz');
    const getStudents = document.getElementById('students');

    const methodItem = {
        method: "GET",
        headers: {
            'Authorization': 'Bearer '
        }
    }

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";

    fetch(url, methodItem)
    // .then(response => response.json())
    .then(result => console.log(result))
