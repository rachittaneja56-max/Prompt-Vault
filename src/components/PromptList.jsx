import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearAllPrompts, clearPrompt, toggleFavourite, updatePrompt } from "../features/promptSlice";
import PromptCard from './PromptCard';
import { useAuth } from "../context/AuthContext"
import AddPromptButton from './AddPromptButton';
import PromptPopUp from './PromptPopUp';
import EditPromptPopUp from './EditPromptPopUp';

function PromptList() {
    const dispatch = useDispatch()
    const { user } = useAuth()
    const prompts = useSelector((state) => state.prompts.prompts)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState("all")
    const [tagFilter, setTagFilter] = useState("all");
    const allTags = [...new Set(prompts.map((p) => p.tag).filter(Boolean))]
    const [selectedPrompt, setSelectedPrompt] = useState(null)
    const [editingPrompt, setEditingPrompt] = useState(null)

    const handleDelete = (id) => {
        dispatch(clearPrompt({ email: user.email, id }))
    }
    const handleClearAll = () => {
        dispatch(clearAllPrompts(user.email))
    }
    const handleToggleFavourite = (id) => {
        dispatch(toggleFavourite({ email: user.email, id }))
    }
    const handleEdit = (prompt) => {
        setEditingPrompt(prompt)
    }
    const handleSaveEdit = (updatedPrompt) => {
        dispatch(updatePrompt({ email: user.email, updatedPrompt }));
        setEditingPrompt(null);
    }
    const filteredPrompts = prompts.filter((p) => {
        const matchesSearch =
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.text.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === "favourites" ? p.isFavourite : true;
        const matchesTag = tagFilter === "all" ? true : p.tag === tagFilter
        return matchesSearch && matchesFilter && matchesTag;
    })

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
                <input
                    type="text"
                    placeholder="Search prompts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-2.5 w-full sm:w-1/3 px-2 py-1.5 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex items-center gap-3">

                    {allTags.length > 0 && (
                        <select
                            value={tagFilter}
                            onChange={(e) => setTagFilter(e.target.value)}
                            className="text-2xl cursor-pointer px-2 py-1 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option className='text-2xl' value="all">All Tags</option>
                            {allTags.map((tag) => (
                                <option className='text-2xl' key={tag} value={tag}>
                                    {tag}
                                </option>
                            ))}
                        </select>
                    )}

                    {prompts.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            className="text-2xl cursor-pointer bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-md font-semibold transition"
                        >
                            Clear All
                        </button>
                    )}
                </div>
            </div>
            <div className='flex justify-between items-center w-full mb-6'>
                <h1 className="text-2xl font-semibold mb-6 text-white">Saved Prompts</h1>
                <div className=" flex items-center gap-4 mb-3">
                    <AddPromptButton />
                </div>
            </div>

            {filteredPrompts.length > 0 ? (
                <div className="w-full min-w-0 overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPrompts.map((prompt) => (
                            <PromptCard
                                key={prompt.id}
                                prompt={prompt}
                                onDelete={handleDelete}
                                onEdit={() => handleEdit(prompt)}
                                onToggleFavourite={handleToggleFavourite}
                                onView={() => setSelectedPrompt(prompt)}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-400 mt-12 text-lg">No prompts found.</p>
            )}
            {selectedPrompt && (
                <PromptPopUp
                    isOpen={!!selectedPrompt}
                    onClose={() => setSelectedPrompt(null)}
                    prompt={selectedPrompt}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleFavourite={handleToggleFavourite}
                />
            )}
            {editingPrompt && (
                <EditPromptPopUp
                    isOpen={!!editingPrompt}
                    onClose={() => setEditingPrompt(null)}
                    prompt={editingPrompt}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
    )
}

export default PromptList;
