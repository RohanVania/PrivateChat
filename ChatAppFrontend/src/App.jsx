import { useState, useRef } from 'react'
import Login from './component/Login';
import Home from './component/Home'


import './App.css'
import socket from "./socket"

function App() {
  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);
  const [userList, setUserList] = useState([]);


  const getUsername = (fetched_username) => {
    setUsernameAlreadySelected(fetched_username);
    socket.auth = { username: fetched_username }
    socket.connect()
  }


  //* If Error is Received from the Server about the socket
  socket.on('connect_error', (err) => {
    if (err.message === "invalid username") {
      setUsernameAlreadySelected(false)
    }
    console.log("Error", err.message);
    console.log(err)
  })

  socket.on('users', (list) => {
    list.forEach((user) => {
      user.self = user.userID === socket.id;
    })
    list = list.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    })

    setUserList(list);
  })

  socket.on('new User Connected', (data) => {
    setUserList([...userList, data]);
  })


  // socket.on("private message",(data)=>{
  //   console.log("Appp =>",data)
  // })



  return (
    <>
      <div className='tw-min-h-[100vh] tw-h-[100vh]'>
        {
          !usernameAlreadySelected ?
            <Login submit={(event) => getUsername(event)} /> :
            <Home usersList={userList} user={usernameAlreadySelected} />

        }

      </div>
    </>
  )
}

export default App


//** Login or Username Field */
// <div className='tw-min-h-[100vh] tw-flex tw-justify-center tw-items-center'>
//   <form className='tw-flex tw-flex-col tw-gap-[20px]' onSubmit={handleSubmit} >
//     <input ref={inputData} type='text' placeholder='Your Username' className='tw-px-[10px] tw-py-[12px] tw-rounded-md tw-border-[1px] tw-min-w-[300px] tw-border-gray-400 tw-outline-none' />
//     <button className='tw-px-[42px] tw-py-[10px] tw-bg-red-400 tw-text-white tw-w-fit'>Send</button>
//   </form>
// </div>