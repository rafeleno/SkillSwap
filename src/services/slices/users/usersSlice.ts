import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { selectAllCategories } from './skillsSlice';

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
  userSwap?: unknown;
};

type UsersState = {
  users: User[];
  currentUser: string | null;
};

const initialState: UsersState = {
  users: localStorage.getItem('users') 
    ? JSON.parse(localStorage.getItem('users')!) 
    : [],
  currentUser: localStorage.getItem('currentUser') || null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', action.payload);
    },
    updateUser: (state, action: PayloadAction<Partial<Omit<User, 'id'>> & { id: string }>) => {
      const { id, ...updates } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === id);
      if (userIndex >= 0) {
        state.users[userIndex] = { 
          ...state.users[userIndex], 
          ...updates 
        };
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
    addToFavourites: (state, action: PayloadAction<{ userId: string; skillId: string }>) => {
      const { userId, skillId } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user && !user.favourites.includes(skillId)) {
        user.favourites.push(skillId);
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
    removeFromFavourites: (state, action: PayloadAction<{ userId: string; skillId: string }>) => {
      const { userId, skillId } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user) {
        user.favourites = user.favourites.filter(id => id !== skillId);
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
    updateSkillsToStudy: (state, action: PayloadAction<{ userId: string; skills: string[] }>) => {
      const { userId, skills } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user) {
        user.skillsToStudy = skills;
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
    updateSkillsToLearn: (state, action: PayloadAction<{ userId: string; skills: string[] }>) => {
      const { userId, skills } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user) {
        user.skillsToLearn = skills;
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
    clearUsers: (state) => {
      state.users = [];
      state.currentUser = null;
      localStorage.removeItem('users');
      localStorage.removeItem('currentUser');
    }
  }
});

export const selectAllUsers = (state: RootState) => state.users.users;
export const selectCurrentUser = (state: RootState) => state.users.currentUser;

export const selectUserById = (userId: string) => 
  createSelector([selectAllUsers], users => 
    users.find(user => user.id === userId)
  );

export const selectUserSkills = (userId: string) => 
  createSelector(
    [selectUserById(userId), selectAllCategories],
    (user, categories) => {
      if (!user || !categories) return { skillsToStudy: [], skillsToLearn: [], favourites: [] };

      const findSkill = (id: string) => {
        for (const category of categories) {
          const skill = category.subcategory.find(skill => skill.id === id);
          if (skill) return skill;
        }
        return null;
      };

      return {
        skillsToStudy: user.skillsToStudy.map(findSkill).filter(Boolean),
        skillsToLearn: user.skillsToLearn.map(findSkill).filter(Boolean),
        favourites: user.favourites.map(findSkill).filter(Boolean)
      };
    }
  );

export const { 
  addUser,
  setCurrentUser,
  updateUser,
  addToFavourites,
  removeFromFavourites,
  updateSkillsToStudy,
  updateSkillsToLearn,
  clearUsers
} = usersSlice.actions;

export default usersSlice.reducer;