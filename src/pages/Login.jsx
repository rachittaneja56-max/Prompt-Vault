import React from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"



function LoginPage() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {login} =useAuth()
    const navigate = useNavigate(); 
    const handleSubmit =(e)=>{
       e.preventDefault()
       if(!email) return true
       const success = login(email,password)  // login returns true/false
       if(success) navigate("/dashboard")
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-900">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-lg w-[350px]">
                <div className="flex flex-row gap-4 text-3xl font-bold text-white  mb-2"><img className='size-10' src={logo} /> Prompt Vault</div>
                <div className="text-sm text-gray-400 text-center mb-6">Your Personal AI Prompt Library</div>
                <form  className='flex flex-col space-y-4' onSubmit={handleSubmit}>
                    <input
                        className="bg-slate-700  text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        type='email'
                        placeholder='Enter your Email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    <input
                        className="bg-slate-700 text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        type='password'
                        placeholder='Enter your password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    <button
                        className="cursor-pointer bg-blue-500  hover:bg-blue-600 text-white py-2 rounded-md font-medium transition">
                        Login
                    </button>
                </form>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                    Your data is securely stored on your device.
                </p>
            </div>
        </div>
    );
}

export default LoginPage
