import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPrompts, setPrompts, clearPrompt, clearAllPrompts } from '../features/promptSlice';
import { useAuth } from "../context/AuthContext"
import { getPrompts } from '../utils/localStorage';
import PromptList from '../components/PromptList';

function DashboardHome() {
    const { user } = useAuth()
    const dispatch = useDispatch()

    useEffect(() => {
        if (user?.email) {
            const storedPrompts = getPrompts(user.email)
            dispatch(setPrompts(storedPrompts))
        }
    }, [user, dispatch])
    return (
        <div className="w-full">
            <PromptList/>  
            
        </div>
    );
}

export default DashboardHome;