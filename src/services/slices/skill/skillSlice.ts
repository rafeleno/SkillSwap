import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { RootState } from  '../../store';
import { fetchSkills, updateSkill } from './thunks';

interface Skill {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  subcategory: Skill[];
}

interface SkillsState {
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SkillsState = {
  categories: [],
  status: 'idle',
  error: null,
};

export const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    clearSkills: (state) => {
      state.categories = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        const { categoryId, skillId, newName } = action.payload;
        const category = state.categories.find(c => c.id === categoryId);
        if (category) {
          const skill = category.subcategory.find(s => s.id === skillId);
          if (skill) skill.name = newName;
        }
      });
  },
});

export const selectAllCategories = (state: RootState) => state.skills.categories;
export const selectSkillsStatus = (state: RootState) => state.skills.status;
export const selectSkillsError = (state: RootState) => state.skills.error;

export const selectCategoryById = (categoryId: string) => 
  createSelector([selectAllCategories], categories =>
    categories.find(category => category.id === categoryId)
  );

export const selectSkillById = (skillId: string) =>
  createSelector([selectAllCategories], categories => {
    for (const category of categories) {
      const skill = category.subcategory.find(s => s.id === skillId);
      if (skill) return skill;
    }
    return null;
  });

export const { clearSkills } = skillSlice.actions;
export default skillSlice;