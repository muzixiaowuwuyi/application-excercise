import React, { useState } from "react";
import { api } from "../../../utils/api";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const NewBlogForm = ({}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const createBlogMutation = api.blogs.createBlog.useMutation();

  //define handlers
  const handleCreateBlog = async () => {
    try {
      if (title.trim() === "") {
        toast.error("Title cannot be empty.");
        return;
      }

      if (content.trim() === "") {
        toast.error("Content cannot be empty.");
        return;
      }

      toast("Saving content...", {
        icon: "⏳",
      });

      await createBlogMutation.mutateAsync({
        title: title,
        content: content,
      });

      await router.replace("/");
    } catch (error) {
      toast.error(`Unable to create new blog: ${error}`);
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#faf7ff] to-[#4a50c683]">
      <div className="flex w-4/5 flex-col items-center justify-center gap-2">
        <h2 className="w-4/5 text-2xl font-bold">New Blog</h2>
        <div className="w-4/5">
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Title:
          </label>
          <input
            className="w-full border border-gray-300 p-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required={true}
          />
        </div>
        <div className="w-4/5">
          <label
            htmlFor="content"
            className="block text-sm font-bold text-gray-700"
          >
            Content:
          </label>
          <textarea
            className="w-full border border-gray-300 p-2"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required={true}
            rows={20}
          ></textarea>
        </div>
        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          onClick={handleCreateBlog}
        >
          Create New Blog
        </button>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default NewBlogForm;
