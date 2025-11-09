import React from "react";
import { Trash2, Edit, Star } from "lucide-react";

function PromptCard({ prompt, onDelete, onEdit, onToggleFavourite,onView }) {
  const { id, title, text, tag, date, isFavourite } = prompt;

  return (
    <div className="bg-slate-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
      <div
      onClick={onView}
      className="cursor-pointer">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-white wrap-break-words">{title}</h3>
          {tag && (
            <span className="text-xs font-medium bg-blue-600 text-white px-2 py-1 rounded-md">
              {tag}
            </span>
          )}
        </div>

        <p className="text-gray-300 text-sm mt-3 mb-4 wrap-break-words leading-relaxed line-clamp-3 ">
          {text}
        </p>
      </div>
      <div className="flex justify-between items-center text-gray-400 text-sm">
        <span>{new Date(date).toLocaleDateString()}</span>

        <div className="flex gap-3 items-center ">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit && onEdit(prompt)
            }}
            className="cursor-pointer hover:text-blue-400 transition"
            title="Edit Prompt"
          >
            <Edit size={18} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavourite && onToggleFavourite(id)
            }}
            className={`cursor-pointer transition ${isFavourite ? "text-yellow-400" : "hover:text-yellow-400"}`}
            title="Toggle Favourite"
          >
            <Star size={18} fill={isFavourite ? "currentColor" : "none"} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete && onDelete(id)
            }} //ondeleteid(id) not directly used because prompt will get deleted as soon
            // as it gets rendered also we addedd && operator to check wether this exists or not then only this would work
            className="cursor-pointer hover:text-red-400 transition"
            title="Delete Prompt"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromptCard;
