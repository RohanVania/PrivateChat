
import React, { useEffect, useState } from 'react'
import { GoDotFill } from "react-icons/go";
import ChatSection from './ChatSection';
import socket from '../socket';


const Home = (props) => {

    const [chatWith, setChatWith] = useState(null)
    // useEffect(()=>{

    // },[chatWith])

    return (
        <div className='tw-h-full tw-flex'>

            {/**  Side Bar */}
            <div className='tw-h-full tw-bg-purple-950 tw-w-[400px] tw-text-white'>
                <ul className='tw-w-full  tw-h-full  tw-flex tw-flex-col tw-gap- tw-pt[30px] '>

                    {
                        props.usersList.map((el, indx) => {
                            // console.log("Mapping the list , individual element =>",el)
                            
                            


                            return socket.id === el.userId ?
                                (<li key={indx} className={`tw-flex tw-flex-col tw-py-[10px] tw-px-[30px] tw-gap-[3px] tw-bg-gray-400  `}>
                                    <p className='tw-text-lg tw-font-thin'>{el.username} (Yourself) </p>
                                    <span className='tw-ml-0 tw-text-md tw-font-thin tw-flex tw-gap-2 tw-items-center'> <GoDotFill className='tw-text-green-400' /> online</span>
                                </li>) :
                                (<li key={indx} className={` tw-flex tw-flex-col tw-py-[10px] tw-px-[30px] tw-gap-[3px] tw-cursor-pointer hover:tw-bg-blue-500`} onClick={()=>setChatWith(el)}>
                                    <p className='tw-text-lg tw-font-thin'>{el.username}  </p>
                                    <span className='tw-ml-0 tw-text-md tw-font-thin tw-flex tw-gap-2 tw-items-center'> <GoDotFill className='tw-text-green-400' /> online</span>
                                </li>)

                        })
                        
                    }

                </ul>
            </div>

            {/* Display All Chat And Input Bar */}
            <div className=' tw-flex-1'>
                {
                    chatWith ?
                        <ChatSection activeChatUser={chatWith} usersList={props.usersList}/> :
                        props.usersList.length <= 1 ? <p className='tw-text-xl tw-capitalize tw-ml-1 tw-my-2 tw-text-gray-800'>No Player to chat please tell someone to join</p> :
                            <p className='tw-text-xl tw-capitalize tw-ml-1 tw-my-2 tw-text-gray-800'>Select Player to Chat</p>
                }
                

            </div>
        </div>
    )
}

export default Home