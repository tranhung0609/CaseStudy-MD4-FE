//
// function showModalAddSong(){
//     $('#addSongModal').html('show')
// }

findAllSinger()
findAllSong()
function  findAllSong(){
    $.ajax({
        headers: {
            Authorization: 'Bearer ' +localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8000/api/song",
        success: function (song) {
            console.log(song)
            displaySong(song)
        }
    })

}
function displaySong(array){
console.log(array)
    let str="";
    for (let i = 0; i <array.length ; i++) {
        str+=`
 <li class="songs-item songs-item--active">
                                            <div class="songs-item-left">
                                                <img src="./assets/img/songs/0.webp" alt="danh sanh nhac" class="songs-item-left-img">
                                                <div class="songs-item-left-body">
                                                    <h3 class="songs-item-left-body-name">${array[i].name}</h3>
                                                    <span class="songs-item-left-body-singer">${array[i].singer.name}</span>
                                                </div>
                                            </div>
                                            <div class="songs-item-center">
                                                <span>${array[i].name}</span>
                                            </div>
                                            <div class="songs-item-right">
                                                <span class="songs-item-right-mv"><i class="fas fa-photo-video"></i></span>
                                                <span class="songs-item-right-lyric"><i class="fas fa-microphone"></i></span>
                                                songs-item-right-tym--active
                                                <span class="songs-item-right-tym">
                                                    <i class="fas fa-heart songs-item-right-tym-first" onclick="likeSong(${array[i].id})"></i>
                                                    <i class="far fa-heart songs-item-right-tym-last"></i>
                                                </span>
                                                <span class="songs-item-right-duration"></span>
                                                <span class="songs-item-right-more"><i class="fas fa-ellipsis-h"></i></span>
                                            </div>
                                            <small>${array[i].likes}</small>
                                        </li>

`

    }
    document.getElementById("display-song").innerHTML=str

}
function findAllSinger(){
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        url: "http://localhost:8000/api/singer/all",
        success: function (singer) {
            console.log(singer)
            let formSelect = ``;
            for (let i = 0; i < singer.length; i++) {
                formSelect += `<option value="${singer[i].id}">${singer[i].name}</option>`
            }
            document.getElementById("singer-select").innerHTML = formSelect;
        }
    })
}

function saveSong(){
    let name =document.getElementById("name").value;
    let url=localStorage.getItem(storageKeyImg);
    let singer=document.getElementById("singer-select").value;
    let userId=localStorage.getItem("id");
    let song={
        name:name,
        url:url,
        singer:{
            id:singer
        },
        user:{
            id:userId

        }
    }
    console.log(song);
    $.ajax({
        headers: {
            Authorization: 'Bearer ' +localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'POST',
        url: "http://localhost:8000/api/song/new-song" ,
        data: JSON.stringify(song),
        success: function (data) {
            console.log(data)
            findAllSong()
        },
        error: function (error) {
            console.log(error)

        }
    })


}

function likeSong(id){
    console.log(id)
    let userId=localStorage.getItem("id")
    $.ajax({
        headers: {
            Authorization: 'Bearer ' +localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'POST',
        url: "http://localhost:8000/api/likes/like-song/"+id+"/" +userId ,
        data: JSON.stringify(),
        success: function (data) {
            console.log(data)
            findAllSong()
        },
        error: function (error) {
            console.log(error)
        }
    })

}
//Upload file
var image = '';
// firebase bucket name
// REPLACE WITH THE ONE YOU CREATE
// ALSO CHECK STORAGE RULES IN FIREBASE CONSOLE
var fbBucketName = 'images';
// get elements
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
let storageKeyImg = 'img';
// listen for file selection
function upload(e) {

    // what happened
    console.log('file upload event', e);

    // get file
    var file = e.target.files[0];

    // create a storage ref
    var storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);

    // upload file
    var uploadTask = storageRef.put(file);

    // The part below is largely copy-pasted from the 'Full Example' section from
    // https://firebase.google.com/docs/storage/web/upload-files

    // update progress bar
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = progress;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, function () {
            // Upload completed successfully, now we can get the download URL
            // save this link somewhere, e.g. put it in an input field
            let downloadURL = uploadTask.snapshot.downloadURL;
            localStorage.setItem(storageKeyImg , downloadURL)
            // document.getElementById('audio').src = downloadURL
            document.getElementById('play').src=downloadURL
        });
}