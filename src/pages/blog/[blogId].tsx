import Error from "next/error";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "../../utils/api";
import Link from "next/link";
import * as moment from "moment";

function SinglePostPage() {
  const router = useRouter();

  const blogId = router.query.blogId as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  //define functions
  const fetchOneBlog = api.blogs.getOne.useQuery({ id: blogId });

  return (
    <div className="center flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#faf7ff] to-[#4a50c683]">
      <div className="mt-12 w-4/5 flex-col justify-center gap-4 rounded bg-white pt-12">
        {fetchOneBlog.data && (
          <div className="ml-4">
            <h2 className="mb-4 text-2xl font-bold ">
              {fetchOneBlog.data.title}
            </h2>
            <nav className="text-blue-600">
              <Link href="/">Home</Link> &gt; {fetchOneBlog.data.title}
            </nav>
            <div className="text-xs text-slate-400">
              Created at:
              {moment(fetchOneBlog.data.createdAt).format(
                "YYYY-MM-DD HH:MM:SS"
              )}
            </div>
            <div className="text-xs text-slate-400">
              Updated at:
              {moment(fetchOneBlog.data.updatedAt).format(
                "YYYY-MM-DD HH:MM:SS"
              )}
            </div>
            <p className="pt-6">{fetchOneBlog.data.content}</p>
          </div>
        )}

        <div className="p mb-4 ml-4 mt-4 inline-block rounded bg-gray-200 px-6 py-2 text-blue-500 hover:underline">
          <Link href={`/`}>Back</Link>
        </div>
      </div>
    </div>
  );
}

export default SinglePostPage;
