const { db } = require('../firebaseConfig');

const getNumberUsersRoom = (roomId) => {
    return db.collection("rooms").get().then((res) => {
        let roomNbUsers;
        res.forEach((element) => {

            const room = element.data();
            if (roomId == room.roomId) {
                roomNbUsers = room.nbUsers;
                //console.log("nbUsers", element.data())
                //console.log("element", element.data())
            }

        })
        return roomNbUsers;
    })
}

const updateRoom = async (roomId, operator) => {
    let nbUsers = await getNumberUsersRoom(roomId);
    const newNbUsers = operator === "add" ? nbUsers + 1 : nbUsers - 1;
    db.collection('rooms').doc(roomId).set({
        nbUsers: newNbUsers,
    }, { merge: true })
    console.log(nbUsers);
}

module.exports = {
    getNumberUsersRoom,
    updateRoom
}