import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full flex justify-center items-center mt-8">
      <SignIn />
    </div>
  );
}
