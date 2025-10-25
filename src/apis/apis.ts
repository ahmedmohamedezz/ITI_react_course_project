import type { UserType, PostType, TodoType } from "../types/types";

async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
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

async function fetchUserPostsCount(
  userId: string | undefined
): Promise<number> {
  const data = await fetchUserPosts(userId);
  return data.length;
}

async function fetchUserCompletedTodosCount(
  userId: string | undefined
): Promise<number> {
  const data = await fetchUserTodos(userId);

  // count only completed todos
  let count: number = 0;
  data.forEach((todo: TodoType) => {
    count += todo.completed ? 1 : 0;
  });

  return count;
}

export {
  fetchUsers,
  fetchUser,
  fetchUserPosts,
  fetchUserTodos,
  fetchUserPostsCount,
  fetchUserCompletedTodosCount,
};
