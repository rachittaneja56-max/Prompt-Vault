import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPrompts } from "../features/promptSlice";
import { useAuth } from "../context/AuthContext";

const PromptForm = ({ onClose }) => {
    const dispatch = useDispatch()
    const { user } = useAuth()

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [tag, setTag] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim() || !title.trim()) return
        dispatch(addPrompts({ 
            email: user.email,
            title,
            text,
            tag: tag || General,
            isFavourite: false
            }))
        onClose()
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-slate-900 p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">Add New Prompt</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 rounded-md bg-slate-800 text-white border border-slate-700"
                    />

                    <textarea
                        placeholder="Enter your prompt text..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full p-2 rounded-md bg-slate-800 text-white border border-slate-700 h-32"
                    />

                    <input
                        type="text"
                        placeholder="Tag "
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="w-full p-2 rounded-md bg-slate-800 text-white border border-slate-700"
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-semibold"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default PromptForm