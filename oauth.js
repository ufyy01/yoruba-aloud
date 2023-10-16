const getCategory = document.getElementById('category');
    const getLearnmat = document.getElementById('learnmat');
    const getSubcat = document.getElementById('subCat');
    const getQuiz = document.getElementById('quiz');
    const getStudents = document.getElementById('students');

    const methodItem = {
        method: "GET",
        headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTdlNDJkYTFlZjE0NWU1NzA5NDA3NDRmNmQ4OWQzMjBkMTAzYWJkYTI3MmY2NzJkZjExNzY2ZjRhOTYxZWM5OWFhNjViYTE4ZTEyNDVlZGQiLCJpYXQiOjE2NTA2NjI5NzIuOTAxNTQyLCJuYmYiOjE2NTA2NjI5NzIuOTAxNTQ4LCJleHAiOjE2NTA2ODA5NzIuODg5NTQ2LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.ZHIDMLoroNLacSf5H7TYl0d0WtLSbBWvSZNPnhvju2o3HiBCscDIJ0dULFTq2ERlnbgmsw36u-RxlaOSIktgxDBdHwtbOOCYmTZhs28coEvdOKL4isUy8tH98JNg-TJQwcd0bs7P8HYBsILYqOkCAHk-w-HIsUoMLqFnHACDxehfm3zthojY52lxeLXrz1roicOk4ENVcunDR6tZa0spytrV_xnCSFvIcmsi1ftBY4Dh2UFXndxO22oor_qhBtGt6ki-7jkLSabUXKmZS3lpLm3lsAJh7LgG-8hCY3wDXpCXik14Qw73d-dMdXvGrAQkcSF6YhU9tNS9UIlhxtd7KjQNja9BJ7jOnVW1oMwWU14d3zAMb2u9Ob-a7vyb2J54cU7_lhEFL7Q5PfRvJfnEnR4RI-bZt0IVGl-bkBVfQGmkxk5lKYYw5Tq9P2JBF_mteSd5MPxtD8QHWfU9b393kGast_FKSJa0ftrl-KCLePqT-8gfty8b0yQ3clE0iq2dOuFoE_H-_SVr57Nri6tF-ndfp2pazjeuP2zTNSJ2n0RnkaLq1GzS35AX_D2zxSmIq85phlJyhwPolvPIB1Q_1E5Jfb7-2MMgk-fYqSHiPQdKXa0dkGVrVgrqoBb9oxxsypGX_ByTOtjvO5aa22d2IJHgEvo9njEb6Ml7dI8UcJY'
        }
    }

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";

    fetch(url, methodItem)
    // .then(response => response.json())
    .then(result => console.log(result))