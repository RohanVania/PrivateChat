
import React, { useState, useRef } from 'react'
import socket from '../socket';

const ChatSection = ({ activeChatUser, usersList }) => {

  const [messages, setMessages] = useState([]);


  let selectedUser = {
    ...usersList,
    messageHistory: [],
  };

  console.log(selectedUser)

  // console.log(selectedUser);
  // console.log(activeChatUser)

  const inputRef = useRef("");


  function handleSubmitMessage(event) {
    event.preventDefault();
    let msg = inputRef.current.value
    if (msg) {
      let embedData = { fromSelf: true, username: activeChatUser.username, content: msg };
      socket.emit('private message', {
        content: msg,
        to: activeChatUser.userId,
        username: activeChatUser.username
      })

      setMessages((prev) => [...prev, embedData]);

    }
    inputRef.current.value = "";
  }

  socket.on("private message", (data) => {
    console.log("List of Users", usersList);
    console.log("Chat Section =>", data)
    let newMessage = {};
    for (let i = 0; i < usersList.length; i++) {
      const user = usersList[i];
      if (user.userId === data.from) {
        newMessage = {
          fromUser: usersList[i].username,
          content: data.content,
          fromSelf: false,
        }
        const messageList = [...messages, newMessage]
        setMessages(messageList)
      }
    }


  })



  return (
    <div className='tw-h-full'>
      <h1 className=' tw-py-[22px] tw-px-[20px] tw-text-2xl tw-border-b-[1px] tw-border-black'>{socket.auth.username} Chatting with <span className='tw-text-blue-500 tw-font-bold '>{activeChatUser.username}</span></h1>

      <div className=' tw-mt-[10px]'>
        <ul className='tw-flex tw-flex-col tw-gap-y-3'>
          {
            messages.map((el, indx) => {
              return el.fromSelf === true && el.username === activeChatUser.username ? <li key={indx} className='tw-py-2 tw-bg-yellow-200 tw-items-end tw-al tw-w-fit tw-px-[45px] tw-ml-2 tw-mr-auto tw-rounded-full'>{el.content}</li>
              :el.fromSelf === false && el.fromUser === activeChatUser.username && <li key={indx} className='tw-py-2 tw-bg-green-200 tw-items-end tw-al tw-w-fit tw-px-[45px] tw-mr-2 tw-ml-auto tw-rounded-full'>{el.content}</li>
            })
          }
          
        </ul>
      </div>

      <form className='tw-flex tw-gap-x-2   tw-absolute tw-bottom-[30px] tw-left-[30%]  tw-w-[60%] ' onSubmit={handleSubmitMessage}>
        <input ref={inputRef} type='text' className='tw-w-[80%] tw-py-[10px] tw-px-[22px] tw-outline-none tw-border-2 tw-border-black   tw-rounded-[20px]' placeholder='Enter your Message' />
        <button className=' tw-bg-blue-400 tw-px-7 tw-text-white' onClick={handleSubmitMessage}>Submit</button>
      </form>
    </div>
  )
}

export default ChatSection