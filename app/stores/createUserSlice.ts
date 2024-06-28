import { StateCreator } from 'zustand';

type User = {
  userId: string;
  avatar: string;
  name: string;
  email: string;
};

export type UserSlice = {
  user: User | null;
  setSession: (u: User) => void;
};

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  setSession: () => set((state) => ({ user: state.user })),
});
