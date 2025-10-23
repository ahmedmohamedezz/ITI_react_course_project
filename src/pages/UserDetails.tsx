import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface UserType {
  id: number;
  name: string;
  email: string;
}

interface PostType {
  id: number;
  title: string;
  body: string;
}

interface TodoType {
  id: number;
  title: string;
  completed: boolean;
}

async function fetchUser(userId: string | undefined): Promise<UserType> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return res.json();
}

async function fetchUserPosts(userId: string | undefined): Promise<PostType[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  return res.json();
}

async function fetchUserTodos(userId: string | undefined): Promise<TodoType[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
  );
  return res.json();
}

function UserDetails() {
  const { id } = useParams();

  // 1. fetch user
  const {
    data: userData,
    isLoading: userLoading,
    error: userErr,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
  });

  // 2. fetch user posts
  const {
    data: postData,
    isLoading: postLoading,
    error: postErr,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchUserPosts(id),
  });

  // 2. fetch user todos
  const {
    data: todoData,
    isLoading: todoLoading,
    error: todoErr,
  } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchUserTodos(id),
  });

  const user: UserType = userData as UserType;
  const posts: PostType[] = postData as PostType[];

  const [todoList, setTodoList] = useState<TodoType[]>([]);

  // if not set, an error happens because setState gets 'undefined'
  useEffect(() => {
    if (todoData) setTodoList(todoData);
  }, [todoData]);

  function handleTodoToggle(todoId: number) {
    setTodoList((prev) =>
      prev?.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  if (userLoading) return <p>Loading...</p>;
  if (userErr) return <p>{userErr.message}</p>;

  return (
    <div className="p-6 bg-white rounded">
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <p>Email: {user.email}</p>

      <hr className="my-7" />

      <div className="flex items-center justify-center p-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Posts</h2>
            {postLoading ? <p>Loading posts...</p> : <p></p>}
            {postErr ? <p>{postErr.message}</p> : <p></p>}
            {!postLoading &&
              posts.map((post) => (
                <div key={post.id} className="border p-2 rounded mb-2">
                  <h3 className="font-bold">{post.title}</h3>
                  <p>{post.body}</p>
                </div>
              ))}
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Todos</h2>
            {todoLoading ? <p>Loading posts...</p> : <p></p>}
            {todoErr ? <p>{todoErr.message}</p> : <p></p>}
            {!todoLoading &&
              todoList.map((todo) => (
                <div
                  key={todo.id}
                  className={
                    todo.completed
                      ? "border-2 border-green-600 bg-green-100 text-green-600 p-2 rounded mb-2 line-through"
                      : "border p-2 rounded mb-2"
                  }
                >
                  <h3
                    className="font-bold cursor-pointer"
                    onClick={() => handleTodoToggle(todo.id)}
                  >
                    {todo.title}
                  </h3>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
