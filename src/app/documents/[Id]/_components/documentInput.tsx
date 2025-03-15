"use client"
import { useState } from "react";
import { BsCloudCheck } from "react-icons/bs";

export const DocumentInput = () => {
    const [title, setTitle] = useState("Untitled Document");
    const [isEditing, setIsEditing] = useState(false);

    const handleBlur = () => {
        if (!title.trim()) setTitle("Untitled Document"); // Default if empty
        setIsEditing(false);
    };

    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleBlur}
                    autoFocus
                    className="text-lg px-1.5 border-b border-gray-400 outline-none"
                />
            ) : (
                <span
                    className="text-lg px-1.5 cursor-pointer truncate"
                    onClick={() => setIsEditing(true)}
                >
                    {title}
                </span>
            )}
            <BsCloudCheck />
        </div>
    );
};