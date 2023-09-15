// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN_STUDENT: 'JWT_TOKEN_STUDENT',
  JWT_TOKEN_INSTRUCTOR: 'JWT_TOKEN_INSTRUCTOR',
  ADDRESS: 'ADDRESS',
  TOKEN: 'TOKEN'
};

// React-query keys
export const QUERY_KEYS = {
  TODOS: 'TODOS',
  ME: 'ME',
  VERIFY: 'VERIFY'
};

// Backend Routes
export const BACKEND_KEYS = {
  TODOS: 'todos',
  USER: 'user'
};

// React-router keys
export const ROUTER_KEYS = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  RESET_PASSWORD: '/reset-password',
  CHANGE_PASSWORD: '/change-password',
  TODOS: '/todos',
  TODO: (id: string) => `/todo/${id}`
};
