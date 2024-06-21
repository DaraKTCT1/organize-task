import { getUser } from "@/actions/userActions";
import Todos from "@/components/Todos";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user: any = await currentUser();
  // console.log(user);
  if (!user) return;
  const fetchData = await getUser(user.id);
  // console.log(fetchData);

  return (
    fetchData && (
      <main className="w-full flex justify-center items-center">
        <Todos todos={fetchData[0].todos} user={fetchData[0]} />
      </main>
    )
  );
}
