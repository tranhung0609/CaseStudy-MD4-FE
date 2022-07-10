


function register() {
    let username = document.getElementById("registername").value
    let password = document.getElementById("registerpass").value
    let confirmPassword = document.getElementById("confirmpassword").value

    let user = {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8000/register",
        data: JSON.stringify(user),
        success: function () {
            alert("Đăng ký thành công. Vui lòng đăng nhập vào hệ thống")
            $('login-register').modal('show')
        },
        error: function (error) {
            alert("Đăng ký thất bại! Vui lòng kiểm tra lại thông tin")
            console.log(error)
        },
    })
}

function closeModalRegister() {
    let abc = document.getElementsByClassName("modal-backdrop")
    for (let i = 0; i < abc.length; i++) {
        abc[i].style.width = 0;
        abc[i].style.height = 0;
    }
    showLogin()
}