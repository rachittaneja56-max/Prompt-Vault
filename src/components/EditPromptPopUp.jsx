import React, { useState, useEffect } from "react"
import { X } from "lucide-react"

function EditPromptPopUp({ isOpen, onClose, prompt, onSave }) {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [tag, setTag] = useState("")
    useEffect(() => {
        if (prompt) {
            setTitle(prompt.title || "");
            setText(prompt.text || "");
            setTag(prompt.tag || "");
        }
    }, [prompt])
    if (!isOpen || !prompt) return null

    const handleSave = () => {
        if (!title.trim() || !text.trim()) return
        onSave({ ...prompt, title, text, tag })
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-slate-800 text-white rounded-2xl shadow-xl w-full max-w-2xl relative p-6">
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-white transition"
                >
                    <X size={18} />
                </button>

                <h2 className="text-2xl font-bold mb-6">Edit Prompt</h2>

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-3 py-2 rounded-md bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <textarea
                        placeholder="Prompt Text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={6}
                        className="px-3 py-2 rounded-md bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />

                    <input
                        type="text"
                        placeholder="Tag (optional)"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="px-3 py-2 rounded-md bg-slate-700 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="cursor-pointer bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded-md transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold transition"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )

}
export default EditPromptPopUp