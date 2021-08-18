import React, { useState, useEffect } from "react";
import { ProjectProps } from "~/lib/projects";
import axios from "axios";
import clsx from "clsx";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { GhostAnchorText } from "~/components/ui/ghost-anchor-text";
import _ from "lodash";

// const stackColors = [
//   {
//     stack_name: "Next.js",
//     class: "bg-gray-100 bg-opacity-25 text-gray-600",
//   },
//   {
//     stack_name: "Typescript",
//     class: "bg-blue-50 bg-opacity-25 text-blue-500",
//   },
//   {
//     stack_name: "Gatsby",
//     class: "bg-purple-50 bg-opacity-25 text-purple-500",
//   },
//   {
//     stack_name: "Chart.js",
//     class: "bg-pink-50 bg-opacity-25 text-pink-500 ",
//   },
//   {
//     stack_name: "Supabase",
//     class: "bg-green-50 bg-opacity-25 text-brand-supabase",
//   },
//   {
//     stack_name: "Tensorflowjs",
//     class: "bg-yellow-50 bg-opacity-25 text-yellow-500",
//   },
//   {
//     stack_name: "Mapbox",
//     class: "bg-blue-50 bg-opacity-25 text-blue-700",
//   },
//   {
//     stack_name: "Jala API",
//     class: "bg-blue-50 bg-opacity-25 text-brand-jala",
//   },
//   {
//     stack_name: "Chakra UI",
//     class: "bg-green-50 bg-opacity-25 text-brand-chakra",
//   },
//   {
//     stack_name: "Netlify CMS",
//     class: "bg-green-50 bg-opacity-25 text-brand-netlify",
//   },
//   {
//     stack_name: "Tailwind CSS",
//     class: `bg-green-50 bg-opacity-25 text-brand-tailwind`,
//   },
// ];

export default function HomeProjectsSection() {
  const [projects, setProjects] = useState<ProjectProps>({} as ProjectProps);
  // const stackClass = (stack: string) => {
  //   const classes = _.find(stackColors, { stack_name: stack });
  //   return [classes?.class, `text-xs p-1 rounded mr-2 mb-1`];
  // };
  function showProjects() {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/recent_projects?sort%5B0%5D%5Bfield%5D=last_update
&sort%5B0%5D%5Bdirection%5D=desc`,
        {
          headers: {
            Authorization: `Bearer ` + process.env.NEXT_PUBLIC_AIRTABLE_TOKEN,
          },
        }
      )
      .then((res) => setProjects(res.data))
      .catch((error) => console.log(error.data));
  }

  useEffect(() => {
    showProjects();
  }, []);

  return (
    <div className="head p-5 pb-6 w-full bg-white bg-opacity-50 rounded-md shadow-md">
      <h2 className="text-lg font-semibold pb-4 text-gray-700">
        💻 Recent projects and contributions
      </h2>
      <div className="flex flex-col space-y-4">
        {projects?.records ? (
          projects?.records.map((project, i: number) => (
            <div
              key={i}
              className="border-gray-300 rounded-md border hover:shadow-md"
            >
              <div className="space-y-3 p-4">
                <div className="space-y-1">
                  <GhostAnchorText
                    className="text-md text-gray-700 font-semibold truncate"
                    href={project.fields.main_url}
                    hoverColor="hover:bg-blue-500 hover:text-white"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    {project.fields.name}
                  </GhostAnchorText>
                  <p className="text-gray-500 text-sm font-light">
                    {project.fields.description}
                  </p>
                </div>
                <div className="">
                  {project.fields.repo_url ? (
                    <GhostAnchorText
                      href={
                        project.fields.repo_url ? project.fields.repo_url : ""
                      }
                      target="_blank"
                      className="text-blue-600 text-sm font-medium"
                      hoverColor="hover:bg-blue-500 hover:text-white"
                      rel="nofollow noopener noreferrer"
                    >
                      {project.fields.repo_title}
                    </GhostAnchorText>
                  ) : (
                    ""
                  )}
                </div>
                {/* <div className="flex flex-wrap">
                  {project.fields.stacks.map((stack, i: number) => (
                    <div key={i} className={clsx(stackClass(stack))}>
                      {stack}
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          ))
        ) : (
          <div className="border-gray-300 rounded-md border p-4">
            <div className="flex flex-col space-y-4 animate-pulse">
              <div className="bg-gray-400 h-5 w-1/3 rounded-md"></div>
              <div className="bg-gray-400 h-10 rounded-md"></div>
              <div className="bg-gray-400 h-4 w-1/4 rounded-md"></div>
              <div className="bg-gray-400 h-3 w-1/2 rounded-md"></div>
            </div>
          </div>
        )}
        <div className="text-blue-600 text-light flex">
          <GhostAnchorText
            className="flex"
            hoverColor="hover:bg-blue-500 hover:text-white"
            href="https://github.com/syauqy"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            View more on <b className="mx-1"> GitHub</b>
            <ArrowRightIcon className="h-4 w-4 my-1" />
          </GhostAnchorText>
        </div>
      </div>
    </div>
  );
}
