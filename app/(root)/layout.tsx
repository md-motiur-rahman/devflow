import LeftSideBar from "@/components/navigation/LeftSideBar";
import Navbar from "@/components/navigation/navbar";
import RightSideBar from "@/components/navigation/RightSideBar";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="background-light850_dark100 relative">
        <Navbar />
        <div className="flex">
          <LeftSideBar />
          <section className="flex min-h-screen flex-col flex-1 px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
            <div className="mx-auto max-w-5xl w-full">{children}</div>
          </section>
          <RightSideBar />
        </div>
        
      </main>
    </>
  );
};

export default RootLayout;
