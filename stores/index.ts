import { create } from 'zustand';
import { createUserSlice, UserSlice } from './createUserSlice';

export const useBoundStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a),
}));
