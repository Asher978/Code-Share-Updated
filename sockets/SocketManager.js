const io = require('../app.js').io;
const { USER_CONNECTED, VERIFY_USER, LOGOUT } = require('./Events');

// empty list of all connected users
let connectedUsers = {};

// empty list of rooms
let rooms = {};

class CodeRoom {
  constructor(roomName) {
    this.coders = [],
    this.roomName = roomName,
    this.messages = []
  }

  // add the coder to the room's codersList
  addCoder (user) {
    this.coders.push(user);
  }

  removeCoder (user) {
    return this.coders.filter(coder => coder._id !== user._id);
  }

}


module.exports = (socket) => {
  console.log('Socket ID from Backend:', socket.id);

  // user connects with username
  socket.on('user_joined', (user) => {
    connectedUsers[user._id] = user;
    console.log("USER JOINED", user)
    socket.user_id = user._id;
    io.sockets.emit('users', connectedUsers)
  })

  // even on refresh of users on the frontened, a looged in user still gets the users list
  socket.on('connected', () => {
    io.sockets.emit('users', connectedUsers)
    io.sockets.emit('rooms', rooms)
  });

  // user creates & joins a new room
  socket.on('add_room', (room_name, user) => {
    console.log("add room", user)
    console.log("add room", room_name)
    rooms[room_name] = new CodeRoom(room_name)
    rooms[room_name].addCoder(user);
    socket.room = room_name;
    socket.join(room_name);
    io.sockets.in(room_name).emit('room_coders', rooms[room_name].coders)
    io.sockets.emit('rooms', rooms)
  });


  // send a list of coders in a specific room
  socket.on('coders_list', (room_name) => {
    console.log("ROOMS", rooms)
    console.log("ROOM NAME", room_name)
    socket.join(room_name);
    let coders = rooms[room_name].coders;
    io.sockets.in(room_name).emit("room_coders", coders)
  })

  // user joins an existing room
  socket.on('join_room', (room_name, user) => {
    rooms[room_name].addCoder(user);
    socket.room = room_name;
    socket.join(room_name);
    io.sockets.in(room_name).emit('room_coders', rooms[room_name].coders)    
  })

  // user sends a message to the room

  // user types in code editor

  // user requests for eval of written code

  // user leaves the room
  socket.on('user_left', (data) => {

    // delete the user from the rooom's coders list
    if (data) {
      const { room_name, user } = data;

      // disconnect the user from the room and update the room's coders list
      // and emit to coders in that room
      rooms[room_name].coders = rooms[room_name].removeCoder(user);
      io.sockets.in(room_name).emit('room_coders', rooms[room_name].coders);
      socket.leave(room_name);

      // if no coders left in the room then delete the room
      if (!rooms[room_name].coders.length) {
        delete rooms[room_name];
        io.sockets.emit('rooms', rooms)
      };
    }
  })

  // user leaves the app
  
  
}