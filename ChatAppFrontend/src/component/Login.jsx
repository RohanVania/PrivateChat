
import React,{useRef} from 'react'

const Login = (props) => {
  const inputData = useRef("");


    const handleSubmit=(e)=>{
        e.preventDefault();
        const username = inputData.current.value;
        props.submit(username)
        inputData.current.value="";
    }


    return (
        <div className='tw-min-h-[100vh] tw-flex tw-justify-center tw-items-center'>
            <form className='tw-flex tw-flex-col tw-gap-[20px]' onSubmit={handleSubmit} >
                <input ref={inputData} type='text' placeholder='Your Username' className='tw-px-[10px] tw-py-[12px] tw-rounded-md tw-border-[1px] tw-min-w-[300px] tw-border-gray-400 tw-outline-none' />
                <button className='tw-px-[42px] tw-py-[10px] tw-bg-red-400 tw-text-white tw-w-fit' onClick={handleSubmit}>Send</button>
            </form>
        </div>
    )
}

export default Login