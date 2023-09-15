export type TTodo = {
  id: string;
  title: string;
  description: string;
  is_private: boolean;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
};

export type TFindTodos = {
  todos: TTodo[];
  total: string;
};

export type TTodoBoolean = {
  [K in keyof TTodo]-?: TTodo[K] extends boolean ? K : never;
}[keyof TTodo];

export type TUpdateTodo = Omit<TTodo, 'created_at' | 'updated_at'>;

export type TCreateTodo = Omit<TUpdateTodo, 'id' | 'user_id'>;

export type TSearchParams = { page: string; status: string; search: string };
