import React from "react";

export default function NotFound() {
  return (
    <main className=" h-screen  w-full grid place-content-center bg-zinc-300">
      <article className="flex flex-col justify-center items-center">
        {/* <picture className="h-full w-full">
          <img src="/images/404.jpg" alt="" />
        </picture> */}
        <p className="text-8xl font-sans font-semibold text-zinc-500">404</p>
        <p>Page Not Found</p>
      </article>
    </main>
  );
}
