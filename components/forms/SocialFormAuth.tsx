"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import ROUTES from "@/constants/routes";
import { signIn } from "next-auth/react";

const SocialFormAuth = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5";
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider,{
        callbackUrl: ROUTES.HOME,
        redirect: true,
      })
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error(
        "Sign In failed",
        {
          duration: 3000,
          description: error instanceof Error
          ? error.message
          : "An error occurred during Sign In",
          closeButton: true,
          
        }
      );
    }
  };
  return (
    <div className="flex flex-wrap mt-10 gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src="/icons/github.svg"
          alt="Github"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span className="">Login with GitHub</span>
      </Button>
      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image
          src="/icons/google.svg"
          alt="Github"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span className="">Login with Google</span>
      </Button>
    </div>
  );
};

export default SocialFormAuth;


