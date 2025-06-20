import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNavigation from "./MobileNavigation";
import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full p-6 gap-5 dark:shadow-none sm:px-12 shadow-light-300">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/images/site-logo.svg" alt="logo" width={23} height={23} />
        <p className="text-2xl font-bold text-dark-100 dark:text-light-900 font-space-grotesk max-sm:hidden">
          Dev <span className="text-primary-500">Flow</span>
        </p>
      </Link>
      <p>Global search</p>
      <div className="flex-between gap-5">
        <Theme />
        {session?.user?.id && (
          <UserAvatar
            id={session?.user?.id}
            name={session?.user?.name ?? ""}
            img={session?.user?.image ?? ""}
          />
        )}
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
