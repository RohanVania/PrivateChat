import express from "express";
import dotenv from "dotenv"
import {Server, Socket} from "socket.io";

dotenv.config()

const backendPort=process.env.BACKEND_PORT;

const app=express();

app.get('/',(req,resp)=>{
    resp.send("Backend Server running");
})


const server=app.listen(backendPort,()=>{
    console.log(`Backend Running on Port ${backendPort}`);
})

const io=new Server(server,{
    cors:{
        origin:'http://localhost:5173'
    }

})


//* Middleware to check for the auth
io.of('/').use((socket,next)=>{
    // console.log(socket)rs
    const username=socket.handshake.auth.username;
    if(!username){
        return next(new Error('"Invalid Username'));
    }
    socket.username=username;
    next();
})

//** This is for main namespace ('/')  */
io.on("connection",(socket)=>{
    // console.log(socket)
    const users=[];
    for(let [id,socket] of io.of("/").sockets){
        users.push({
            userId:id,
            username:socket.username,
            key:id,
        })
    }
    socket.emit('users',users);
    // console.log("List of Connected",users);


    //* Notify other Users except the user itself
    socket.broadcast.emit('new User Connected',{
        userId:socket.id,
        username:socket.username,
        key:socket.id,
        self:false
    })
    
    socket.on("private message",({content,to,username})=>{
        console.log(content, "And TO" ,to,username);
        socket.to(to).emit("private message", {
            content,
            from: socket.id,
            username
          });

    })



    socket.on('disconnect',()=>{
        console.log("Client Disconnected");
    })
})
