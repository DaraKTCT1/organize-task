import { getUser } from "@/actions/userActions";
import Todos from "@/components/Todos";
import { currentUser } from "@clerk/nextjs/server";

// interface Props{
//   searchParams: { [key: string]: string | string[] | undefined };
// }

const Create = async () => {
  
  const user: any = await currentUser();
  // console.log(user);
  if (!user) return;
  const fetchData = await getUser(user.id);
  // console.log(fetchData);

  return (
    <div className="w-full flex justify-center items-center">
      {fetchData && <Todos todos={fetchData[0].todos} user={fetchData[0]} />}
    </div>
  );
};

export default Create;
