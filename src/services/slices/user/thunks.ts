import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { User } from './userSlice';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveUserData = createAsyncThunk(
  'user/saveData',
  async (userData: Partial<User>, { getState, rejectWithValue }) => {
    try {
      const { user } = getState() as RootState;
      if (!user) throw new Error('User not initialized');
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);