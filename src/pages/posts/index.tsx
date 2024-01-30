import Link from "next/link";
import React, { useState } from "react";
import NewPostForm from "./new";

export const PostPages = function () {
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });

  const toggleNewPostForm = () => {
    setShowNewPostForm(!showNewPostForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateNewPost = () => {
    console.log("Creating new post:", newPost);
    ///TODO:// Add logic here to save the new post to your data source (database, API, etc.)
    // After successfully saving the new post, toggle back to the post list view
    toggleNewPostForm();
  };

  const Posts: [] = [
    {
      id: "1a23b45c-678d-90e1-f23g45h67i89",
      title: "Lorem Ipsum Blog",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget metus vitae quam dignissim accumsan at sit amet turpis.",
      createdAt: "2022-01-15T12:30:00.000Z",
      updatedAt: "2022-01-30T09:45:00.000Z",
    },
    {
      id: "2b34c56d-789e-01f2-g34h56i78j90",
      title: "Random Thoughts",
      content:
        "Suspendisse potenti. Integer bibendum nunc at mi ultrices, vel tincidunt odio luctus. Proin eu purus id odio interdum fringilla.",
      createdAt: "2022-01-20T08:15:00.000Z",
      updatedAt: "2022-01-28T14:20:00.000Z",
    },
    {
      id: "3c45d67e-890f-12g3-h45i67j89k01",
      title: "Coding Adventures",
      content:
        "Vestibulum vitae libero vel enim varius tristique non eu nulla. Curabitur fringilla nisl et est euismod, vel congue justo bibendum.",
      createdAt: "2022-01-25T18:00:00.000Z",
      updatedAt: "2022-01-29T11:10:00.000Z",
    },
  ];

  return (
    <div className="posts-list-container mx-auto p-4">
      <div className="mb-4 text-3xl font-bold">Application Excercise</div>
      <div className="mb-4">
        {!showNewPostForm && (
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={toggleNewPostForm}
          >
            Create new Post
          </button>
        )}
      </div>

      {showNewPostForm ? (
        <NewPostForm
          newPost={newPost}
          handleInputChange={handleInputChange}
          handleCreateNewPost={handleCreateNewPost}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Posts.map((post) => (
            <div key={post.id} className="rounded bg-white p-6 shadow">
              <p className="mb-2 text-lg font-semibold">{post.title}</p>
              <Link
                href={`/posts/${post.id}`}
                className="text-blue-500 hover:underline"
              >
                Read this Post
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
