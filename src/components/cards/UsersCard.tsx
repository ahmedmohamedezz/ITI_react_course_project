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
    retry: 3,
  });

  if (isLoading)
    return (
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-6 text-center text-gray-600">
        <p>Loading users...</p>
      </div>
    );

  if (error)
    return (
      <div className="max-w-4xl mx-auto mt-10 bg-red-50 border border-red-200 text-red-700 rounded-2xl shadow-sm p-6 text-center">
        <p>Failed to load users. Please try again later.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto bg-amber-100 p-8 rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Users
      </h2>

      <ul>
        {data.map((user: UserType) => (
          <li
            key={user.id}
            onClick={() => navigate(`/users/${user.id}`)}
            className="cursor-pointer bg-white border border-gray-200 p-4 rounded-xl mb-3 flex flex-row items-center justify-between"
          >
            <div>
              <p className="text-lg font-semibold text-left text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500 text-left">{user.email}</p>
            </div>
            <span className="text-sm text-blue-600 font-medium mt-2 sm:mt-0">
              View Profile
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersCard;
