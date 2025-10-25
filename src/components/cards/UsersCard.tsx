import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../apis/apis";

interface UserType {
  id: number;
  name: string;
  email: string;
}

function UsersCard() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    retry: 3, // trails of fetching
  });

  if (isLoading) return <p>Loading ...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Users</h2>
      <ul>
        {data.map((user: UserType) => (
          <div className="my-2" key={user.id}>
            <li
              className="cursor-pointer hover:bg-amber-200 inline px-2.5 py-1.5 rounded-2xl"
              onClick={() => {
                navigate(`/users/${user.id}`);
              }}
            >
              {user.name}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default UsersCard;
