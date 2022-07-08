



function getInfor() {
    FB.api(
        '/me',
        'GET',
        {"fields":"first_name,id"},
        function(response) {
            console.log(response.first_name);
            console.log(response.id);
        }
    );
}

//hàm đăng xuất fb
function logout() {
    FB.logout(function(response) {
        // Person is now logged out
        getInfor()
    });
}


function registerFb(response) {
    let username = response.id
    let password = '1'
    let confirmPassword = '1'
    let name = response.first_name
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
            alert(`Xin chào ${name}. Chúc bạn nghe nhạc vui vẻ!!!`)

            login(user)
        },
        error: function (error) {
            alert("Đăng ký thất bại! Vui lòng kiểm tra lại thông tin")
            console.log(error)
        },
    })
}



function login(account){
    let usn = account.username
    let pw = account.password
    let user = {
        username: usn,
        password: pw,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'POST',
        url: "http://localhost:8000/login",
        data: JSON.stringify(user),
        success: function (data) {
            localStorage.setItem('token', data.accessToken)
            localStorage.setItem("id", data.id)

            console.log(user)
        },
        error: function (error) {
            alert("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin")
            console.log(error)
        }
    })
}