let accessToken = ""
let id=""

function login(){
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
            console.log(data)
            accessToken = data.accessToken
            console.log(token = data.accessToken)
            id = data.id
            name = data.username
            localStorage.setItem('token', data.accessToken)
            console.log(localStorage.setItem('token', data.accessToken))
            localStorage.setItem("id", data.id)
            console.log(localStorage.setItem("id", data.id))
            alert("Đăng nhập thành công. Chúc bạn nghe nhạc vui vẻ!!!")

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


function logout(){
    token=""
    userId=""
    userName=""
    alert("Đăng xuất thành công! Cảm ơn bạn đã nghe nhạc của chúng tôi.")

    localStorage.setItem("token", token)
    localStorage.setItem("id", userId)
    localStorage.setItem("name", userName)
    // localStorage.removeItem('token');
}