import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { fetchUserData, saveUserData } from './thunks';

export type User = {
  id: string;
  image: string;
  name: string;
  email: string;
  data: string;
  gender: 'male' | 'female' | 'Не указан';
  location: string;
  city: string;
  description: string;
  favourites: string[];
  skillsToStudy: string[];
  skillsToLearn: string[];
  userSwap?: unknown;
};

type UserState = {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: UserState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  status: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('user');
      }
    },
    updateUserField: <K extends keyof User>(state: UserState, action: PayloadAction<{ field: K; value: User[K] }>) => {
      if (state.user) {
        state.user[action.payload.field] = action.payload.value;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    addToFavourites: (state, action: PayloadAction<string>) => {
      if (state.user && !state.user.favourites.includes(action.payload)) {
        state.user.favourites.push(action.payload);
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    removeFromFavourites: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.favourites = state.user.favourites.filter(id => id !== action.payload);
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    resetUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(saveUserData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(saveUserData.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(saveUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const selectCurrentUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;

export const { 
  setUser,
  updateUserField,
  addToFavourites,
  removeFromFavourites,
  resetUser
} = userSlice.actions;

export default userSlice.reducer;