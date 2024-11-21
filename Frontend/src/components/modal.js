import React from "react";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 text-gray-100 rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="flex justify-end items-center pb-2">
          <button
            className="text-gray-400 hover:text-gray-200"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
