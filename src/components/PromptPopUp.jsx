import React from "react"
import { X, Edit, Trash2, Star } from "lucide-react"

function PromptPopUp({ isOpen, onClose, prompt, onEdit, onDelete, onToggleFavourite }) {
  if (!isOpen || !prompt) return null;

  const { id, title, text, tag, date, isFavourite } = prompt;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-slate-800 text-white rounded-2xl shadow-xl w-full max-w-2xl relative p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={14} />
        </button>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold wrap-break-words">{title}</h2>
          {tag && (
            <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md font-semibold">
              {tag}
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Added on {new Date(date).toLocaleDateString()}
        </p>
        <p className="text-gray-200 whitespace-pre-wrap wrap-break-words leading-relaxed mb-6">
          {text}
        </p>
        
      </div>
    </div>
  );
}

export default PromptPopUp;
