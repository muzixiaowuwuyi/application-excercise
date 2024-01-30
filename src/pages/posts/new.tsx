// NewPostForm.js
import React from "react";

const NewPostForm = ({ newPost, handleInputChange, handleCreateNewPost }) => {
  return (
    <div className="mb-4">
      <h2 className="mb-2 text-2xl font-bold">New Post</h2>
      <div className="mb-2">
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full rounded border px-3 py-2"
          value={newPost.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          Content:
        </label>
        <textarea
          id="content"
          name="content"
          className="w-full rounded border px-3 py-2"
          value={newPost.content}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
        onClick={handleCreateNewPost}
      >
        Create Post
      </button>
    </div>
  );
};

export default NewPostForm;
