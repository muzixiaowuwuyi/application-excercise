import { useState } from "react";
import { api } from "~/utils/api";

export default function Home() {
  //define constants
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleToUpdate, setTitleToUpdate] = useState("");
  const [contentToUpdate, setContentToUpdate] = useState("");
  const [blogId, setBlogId] = useState("");
  const [blogIdToUpdate, setBlogIdToUpdate] = useState("");
  const [blogIdToDelete, setBlogIdToDelete] = useState("");

  //define functions
  const fetchAllBlogs = api.blogs.getAll.useQuery();
  const fetchOneBlog = api.blogs.getOne.useQuery({ id: blogId });

  const createBlogMutation = api.blogs.createBlog.useMutation();
  const updateBlogMutation = api.blogs.updateBlog.useMutation();
  const deleteBlogMutation = api.blogs.deleteBlog.useMutation();

  //define handlers
  const handleCreateBlog = async () => {
    try {
      await createBlogMutation.mutateAsync({
        title: title,
        content: content,
      });
      setTitle("");
      setContent("");
      void fetchAllBlogs.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateBlog = async () => {
    try {
      await updateBlogMutation.mutateAsync({
        id: blogIdToUpdate,
        title: titleToUpdate,
        content: contentToUpdate,
      });
      setTitleToUpdate("");
      setContentToUpdate("");
      setBlogIdToUpdate("");
      void fetchAllBlogs.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      await deleteBlogMutation.mutateAsync({
        id: blogIdToDelete,
      });
      setBlogIdToDelete("");
      void fetchAllBlogs.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  //return an empty div
  return (
    <div className="mx-auto p-8">
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Get All Users</h2>
      </div>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => fetchAllBlogs.refetch()}
      >
        Get All
      </button>

      <div className="text- mb-4 mt-4 grid grid-cols-3 gap-4 font-bold">
        <p>Id</p>
        <p>Title</p>
        <p>Content</p>
      </div>

      {fetchAllBlogs.data &&
        fetchAllBlogs.data.map((blog) => (
          <div
            key={blog.id}
            className="my-4 grid grid-cols-3 gap-4 rounded border border-gray-300 bg-white p-4 shadow"
          >
            <p>{blog.id}</p>
            <p>{blog.title}</p>
            <p>{blog.content}</p>
          </div>
        ))}

      {/* Get one user UI */}

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Get One</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Enter id to get"
            value={blogId || ""}
            onChange={(e) => setBlogId(String(e.target.value))}
          />
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => fetch.refetch()}
          >
            Get One User
          </button>
        </div>
        {fetchOneBlog.data && (
          <div>
            <p>Title: {fetchOneBlog.data.title}</p>
            <p>Content: {fetchOneBlog.data.content}</p>
          </div>
        )}
      </div>

      {/* Create User */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Create New</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-1/2 border border-gray-300 p-2"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          onClick={handleCreateBlog}
        >
          Create
        </button>
      </div>

      {/* Update */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Update</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2"
            placeholder="Title to update"
            value={titleToUpdate}
            onChange={(e) => setTitleToUpdate(e.target.value)}
          />
          <input
            className="w-1/2 border border-gray-300 p-2"
            placeholder="Content to update"
            value={contentToUpdate}
            onChange={(e) => setContentToUpdate(e.target.value)}
          />
        </div>
        <input
          placeholder="Enter id to update"
          className="mr-2 border border-gray-300 p-2"
          value={blogIdToUpdate}
          onChange={(e) => setBlogIdToUpdate(e.target.value)}
        />
        <button
          className="mt-2 rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          onClick={handleUpdateBlog}
        >
          Update
        </button>
      </div>

      {/* Delete */}

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Delete</h2>
        <input
          placeholder="Enter id to delete"
          className="mr-2 border border-gray-300 p-2"
          value={blogIdToDelete}
          onChange={(e) => setBlogIdToDelete(e.target.value)}
        />
        <button
          className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={handleDeleteBlog}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
