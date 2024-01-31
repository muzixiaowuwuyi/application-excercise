import Link from "next/link";
import { api } from "../../utils/api";
import * as moment from "moment";

export const BlogPages = function () {
  const fetchAllBlogs = api.blogs.getAll.useQuery();

  return (
    <div className="posts-list-container center	w-3/5">
      <div className="mb-4 text-3xl font-bold">Application Excercise</div>
      <div className="mb-4">
        <Link
          href={`/blog/new`}
          className="mt-4 inline-block rounded bg-gray-200 px-3 py-1 text-blue-500 hover:underline"
        >
          New blog
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {fetchAllBlogs.data?.map((blog) => (
          <div key={blog.id} className="rounded bg-white p-6 shadow">
            <Link
              className="mb-2 font-semibold"
              href={`/blog/${blog.id}`}
              className="text-2xl hover:underline"
            >
              <h2 className="text-black	">{blog.title}</h2>
            </Link>
            <span className="text-slate-400	">
              Created at:
              {moment(blog.createdAt).format("YYYY-MM-DD HH:MM:SS")}
            </span>
            <p className="pt-6">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
