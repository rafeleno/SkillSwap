export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  subcategory: Subcategory[];
}

export interface SkillItem {
  id: string;
  name: string;
  parent: string | null;
  children: { id: string; name: string }[];
}

export interface SkillsPopupProps {
  onClose: () => void;
  skillsMap: SkillItem[];
  onChangeFilters?: (filters: Record<string, string[]>) => void;
}
