import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import PromptCard from "../components/PromptCard"
import PromptPopUp from "../components/PromptPopUp"
import EditPromptPopUp from "../components/EditPromptPopUp"
import { setPrompts, clearPrompt, toggleFavourite, updatePrompt } from "../features/promptSlice"
import { getPrompts } from "../utils/localStorage"
import { useAuth } from "../context/AuthContext"

function Favourites() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const prompts = useSelector((state) => state.prompts.prompts);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [editingPrompt, setEditingPrompt] = useState(null);

  useEffect(() => {
    if (user?.email) {
      const storedPrompts = getPrompts(user.email);
      dispatch(setPrompts(storedPrompts));
    }
  }, [user, dispatch]);

  const favouritePrompts = prompts.filter((p) => p.isFavourite);

  const handleDelete = (id) => {
    dispatch(clearPrompt({ email: user.email, id }));
  };

  const handleToggleFavourite = (id) => {
    dispatch(toggleFavourite({ email: user.email, id }));
  };

  const handleEdit = (prompt) => {
    setEditingPrompt(prompt);
  };

  const handleSaveEdit = (updatedPrompt) => {
    dispatch(updatePrompt({ email: user.email, updatedPrompt }));
    setEditingPrompt(null);
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-6 text-white">Favourite Prompts</h1>
      {favouritePrompts.length > 0 ? (
        <div className="w-full min-w-0 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favouritePrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onToggleFavourite={handleToggleFavourite}
                onView={() => setSelectedPrompt(prompt)}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-10">No favourite prompts yet ⭐</p>
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
  );
}

export default Favourites;