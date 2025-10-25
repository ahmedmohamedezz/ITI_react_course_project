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

export type { UserType, PostType, TodoType };
