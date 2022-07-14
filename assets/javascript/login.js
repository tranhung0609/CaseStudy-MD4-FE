let accessToken = ""

function login() {
    let usn = document.getElementById("username").value;
    let pw = document.getElementById("password").value;
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
            accessToken = 1
            localStorage.setItem("id", data.id)
            alert("Đăng nhập thành công. Chúc bạn nghe nhạc vui vẻ!!!")

            console.log(user)
            checkLogin()
        },
        error: function (error) {
            alert("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin")
            console.log(error)
        }
    })
}

function logout() {
    localStorage.removeItem('token');
}


function logout() {
    token = ""
    userId = ""
    userName = ""
    localStorage.setItem("token", token)
    localStorage.setItem("id", userId)
    localStorage.setItem("name", userName)
    showHome()
    // localStorage.removeItem('token');
}

let a =
{
    id: 3396, first_name
:
    "Nguyễn", last_name
:
    "Trung Kiên", email
:
    "joskientn@gmail.com",…
}
avatar: {
    id: 383, user_id
:
    3396, feed_id
:
    null, comment_id
:
    null,…
}
center_id: 1
created_at: "2022-02-25 17:37:17"
deleted_at: null
email: "joskientn@gmail.com"
first_name: "Nguyễn"
framework_id: 1
group_id: 261
id: 3396
is_locked: 0
last_name: "Trung Kiên"
program_id: 40
roles: [{id: 1
}]
0
:
{
    id: 1
}
roles_centers: [{id: 1
}]
student_id: 3114
tour_id: null
updated_at: "2022-02-25 17:37:17"
user_id: 3114
user_profile: {
    id: 178, user_id
:
    3396, photo_id
:
    383, active
:
    1, created_at
:
    "2022-03-15 21:21:02",…
}



window.localStorage.setItem("user",a)