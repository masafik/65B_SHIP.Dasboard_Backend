import { all } from "../handlers/scaffolding.js"
import _ from 'lodash'

let io_;

const socketConnection = (io) => {

    io_ = io

    io.on('connection', async client => {
        // io.emit('notification', 'new')
        // setInterval(() => {
        //     // let check_noti = await
        //     console.log(Math.random())
        //     io.emit('notification', 'new')
        // }, 60000
        // )

        console.info(`Client connected [id=${client.id}]`);
        client.join(client.request._query.id);
        client.on('scaffolding', async (req, res) => {
            let data = await all()

            io.sockets.emit('scaffolding', data)
        });


        client.on('ping', async (req, res) => {
            console.log('ping')
        });



        // io.sockets.emit('test', client.request._query.id)

        // io.sockets.emit('workPermit', await WorkPermit.findOne({
        //     $where:
        // }))


        // scafFolding

        client.on('disconnect', () => {
            console.info(`Client disconnected [id=${client.id}]`);
        });

    })
};




const getIo = () => {
    return io_
}

export default { socketConnection, getIo }


// const sendMessage = (roomId, key, message) => io.to(roomId).emit(key, message);

// const getRooms = () => io.sockets.adapter.rooms;

// export { socketConnection, sendMessage, getRooms }