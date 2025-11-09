import React, { useState } from "react";
import PromptForm from "./PromptForm";

const AddPromptButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md text-white font-semibold transition"
            >
                + Add Prompt
            </button>

            {isOpen && <PromptForm onClose={() => setIsOpen(false)} />}
        </>
    )
}
export default AddPromptButton