"use client";

import { useClerk, SignOutButton, useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  // const { signOut } = useClerk();

  return (
    <nav className="border-b border-b-gray-200 h-[8vh] w-full flex items-center">
      <div className="w-full flex px-10 md:px-32 justify-between items-center">
        <Link href="/">
          <h1 className="font-bold text-3xl transparent-text">ORGANIZE</h1>
        </Link>
        <div className="flex items-center gap-x-5">
          {isSignedIn && (
            <>
              <button className="w-[100px] bg-gray-200 p-2 rounded-md text-center">
                <SignOutButton />
              </button>
              <UserButton />
            </>
          )}
          {/* <div className="flex items-center gap-x-3"> */}
          {/* <Link href="/sign-in"> */}
          {/* <button className="w-[100px] bg-gray-200 p-2 rounded-md text-center"> */}
          {/* Sign In */}
          {/* </button> */}
          {/* </Link> */}
          {/* <Link href="/sign-up"> */}
          {/* <button className="w-[100px] bg-gray-200 p-2 rounded-md text-center"> */}
          {/* Sign Up */}
          {/* </button> */}
          {/* </Link> */}
          {/* </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
