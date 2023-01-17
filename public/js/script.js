const videoContainer = document.getElementById("video-container");
const myVideo = document.createElement("video");
myVideo.muted = true;
const socket = io("/");
const myPeer = new Peer();
/*const myPeer = new Peer(undefined, {
    secure: true,
    port: 443,
})*/
let peers = {};

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
}).then((stream) => {
    addVideoStream(myVideo, stream);

    myPeer.on('call', (call) => {
        call.answer(stream);
        const video = document.createElement('video')
        call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream)
        })
    })


    socket.on('user-connected', (userId) => {
        console.log("userId :", userId);
        connectToNewUser(userId, stream);
    })
})


myPeer.on('open', (id) => {
    socket.emit("join-room", ROOM_ID, id)
})

//socket.emit('join-room', ROOM_ID, 1);

socket.on('user-disconnected', (userId) => {
    if (peers[userId]) peers[userId].close();
})

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream)
    })

    call.on('close', () => {
        video.remove();
    })

    peers[userId] = call;
}

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoContainer.append(video);
}