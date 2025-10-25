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

interface WeatherType {
  city: string;
  description: string;
  temperature: number;
  humidity: number;
  iconLink: string;
}

export type { UserType, PostType, TodoType, WeatherType };
