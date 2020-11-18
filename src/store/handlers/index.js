export const setSubMenu = (state, setState) => (selected_key) => {
  setState({...state, selected_key});
};

export * from './auth';
export * from './news';
export * from './meeting';
export * from './complaint';
export * from './users';
export * from './requests';
export * from './slots';
export * from './comments_likes';
