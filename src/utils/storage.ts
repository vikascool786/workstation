export const saveUser = (user: any) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const clearUser = () => {
  localStorage.removeItem('user');
};
