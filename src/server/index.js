import { Server } from "socket.io";

const io = new Server({ 
    cors:{
        origin:"http://localhost:3000"

} });
let onlineUsers = [];

const addNewUser = (userid,socketId)=>{
    //!onlineUsers.some((user) => user.userid === userid, userid) && 
    onlineUsers.push({userid , socketId});
};
const removeUSer = (socketId) =>{
    onlineUsers = onlineUsers.filter((user)=>user.socketId !== socketId);
};
const getUser = (userid) =>{
    return onlineUsers.find((user =>user.userid === userid ));
};

io.on("connection", (socket) => {
    // socket.on("test", "hello soufiane")
   socket.on("newUser",(userid) =>{
       addNewUser(userid , socket.id);
       console.log('ADD');
       console.log(onlineUsers);
   });
   socket.on("sendNotification",({senderOffreid,receiverid})=> {
       const receiver = getUser(receiverid);
       io.emit("test", console.log(receiverid))
       io.to(receiver.socketId).emit("getNotifocation", {
        senderOffreid,
       });
   });
   socket.on("disconnect", () =>{
       removeUSer(socket.id);
   });
});

io.listen(5000);