import { getData } from "@/actions/todoActions";
import { getUser, getUsers } from "@/actions/userActions";
import Todos from "@/components/Todos";

export const revalidate = 10;

export default async function Home() {
  const users = await getUsers();
  console.log(users);
  const data = await getData(users[0].id);
  const user = await getUser(users[0].id);
  console.log(user);

  return (
    <main className="w-full flex justify-center items-center">
      <Todos todos={data} user={users[0]} />
    </main>
  );
}
