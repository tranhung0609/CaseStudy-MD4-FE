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
            token = data.accessToken
            id = data.id
            name = data.username
            localStorage.setItem('name', data.username)
            localStorage.setItem('token', data.accessToken)
            localStorage.setItem("id", data.id)
            alert("Đăng nhập thành công. Chúc bạn nghe nhạc vui vẻ!!!")
            location.reload()
            document.getElementById('hidelogin').style.display = 'none'
            console.log(user)
        },
        error: function (error) {
            alert("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin")
            console.log(error)
        }
    })
}

//
// function logout(){
//     localStorage.removeItem('token');
//     alert("Đăng xuất thành công! Cảm ơn bạn đã nghe nhạc của chúng tôi.")
// }


function logout() {
    token = ""
    userId = ""
    userName = ""
    alert("Đăng xuất thành công! Cảm ơn bạn đã nghe nhạc của chúng tôi.")
    window.localStorage.clear()
    location.reload()
    localStorage.removeItem('name');
}

function renameUser() {
    let name = localStorage.getItem("name");
    console.log(name)
    $("#renameUser").html(name.toUpperCase())
}

renameUser()


function hideBtn() {
    let name = localStorage.getItem("name");
    if (name != null) {
        document.getElementById("hide-login").style.display = "none";
        document.getElementById("hide-register").style.display = "none";
    }
}

hideBtn();
