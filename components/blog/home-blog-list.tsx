import React from "react";
import { PostsProps, Post } from "@/lib/blog";
import BlogList from "./blog-list";
import { GhostInternalLink } from "@/components/ui/ghost-interal-link";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { ArrowRightIcon } from "@heroicons/react/solid";

dayjs.extend(LocalizedFormat);

export default function HomeBlogList({ posts }: PostsProps) {
  // console.log("blog", posts);
  return (
    <div className="head p-5 pb-6 w-full bg-white bg-opacity-50 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold pb-4 text-gray-700">
        ✍️ Recent blog
      </h2>
      <ul className="space-y-6">
        {posts.slice(0, 1).map((post: Post, index: number) => (
          <BlogList key={index} post={post} />
        ))}
        <div className="text-blue-600 text-light flex">
          <GhostInternalLink
            className="flex"
            hoverColor="hover:bg-blue-500 hover:text-white"
            path="/blog"
          >
            Read all <b className="mx-1">posts</b>
            <ArrowRightIcon className="h-4 w-4 my-1" />
          </GhostInternalLink>
        </div>
      </ul>
    </div>
  );
}
