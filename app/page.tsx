import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-2xl flex flex-col justify-center items-center gap-3 md:gap-7">
        <div className="text-3xl text-center text-black font-semibold md:text-5xl md:font-medium mt-6 md:mt-10 transparent-text-title py-3">
          Organize Your Task
        </div>

        <p className="text-sm md:text-lg text-center md:mt-2 py-3 md:py-1">
          Click button create task below to organize your task or if you do not
          have an account just create an account for free
        </p>

        <div className="md:mt-2 py-3 md:py-1">
          <Link href="/create">
            <button className="btn">
              <strong className="strong-tag">Create Task</strong>
              <div className="container-stars">
                <div className="stars"></div>
              </div>

              <div className="glow">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
