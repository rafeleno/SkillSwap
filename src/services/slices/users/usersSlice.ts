import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

type User = {
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
  userSwap: unknown; // чуть позже поменяю
};

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: localStorage.getItem('users') 
    ? JSON.parse(localStorage.getItem('users')!) 
    : [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },

    updateUserData: (state, action: PayloadAction<Partial<Omit<User, 
      'skillsToStudy' | 'skillsToLearn'>> & { id: string }>) => {
      const { id, ...updatedData } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === id);
      if (userIndex >= 0) {
        state.users[userIndex] = { 
          ...state.users[userIndex], 
          ...updatedData 
        };
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },

    addToFavourites: (state, action: PayloadAction<{ userId: string; favouriteId: string }>) => {
      const { userId, favouriteId } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user && !user.favourites.includes(favouriteId)) {
        user.favourites.push(favouriteId);
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },

    removeFromFavourites: (state, action: PayloadAction<{ userId: string; favouriteId: string }>) => {
      const { userId, favouriteId } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user) {
        user.favourites = user.favourites.filter(id => id !== favouriteId);
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },

    replaceSkillsToStudy: (state, action: PayloadAction<{ userId: string; skillIds: string[] }>) => {
      const { userId, skillIds } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user) {
        user.skillsToStudy = skillIds;
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },

    replaceSkillsToLearn: (state, action: PayloadAction<{ userId: string; skillIds: string[] }>) => {
      const { userId, skillIds } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user) {
        user.skillsToLearn = skillIds;
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },

    clearUsers: (state) => {
      state.users = [];
      localStorage.removeItem('users');
    }
  }
});

export const selectAllUsers = (state: RootState) => state.users.users;

export const selectUserById = (userId: string) => 
  createSelector([selectAllUsers], users => 
    users.find(user => user.id === userId)
  );

export const selectUserSkills = (userId: string) => 
  createSelector(
    [selectUserById(userId), (state: RootState) => state.skills.skills], //скоро добавлю slice skill
    (user, skills) => {
      if (!user || !skills) return { skillsToStudy: [], skillsToLearn: [] };

      return {
        skillsToStudy: user.skillsToStudy
          .map(skillId => skills.find(skill => skill.id === skillId))
          .filter(Boolean),
        skillsToLearn: user.skillsToLearn
          .map(skillId => skills.find(skill => skill.id === skillId))
          .filter(Boolean),
      };
    }
  );

export const { 
  addUser, 
  updateUserData, 
  addToFavourites, 
  removeFromFavourites,
  replaceSkillsToStudy,
  replaceSkillsToLearn,
  clearUsers
} = usersSlice.actions;

export default usersSlice.reducer;