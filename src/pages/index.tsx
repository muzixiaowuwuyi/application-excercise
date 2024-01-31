import Head from "next/head";
import { BlogPages } from "./blog";
import React from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Application Excercise</title>
        <meta name="description" content="Blog challenge - Guangzheng Li" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#faf7ff] to-[#4a50c683]">
        <BlogPages></BlogPages>
      </main>
    </>
  );
}
