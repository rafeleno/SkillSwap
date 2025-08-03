import React, { useRef, useEffect, useState } from 'react';
import { CATEGORY_ICONS, CategoryId } from './CategoryIcons';
import styles from './styles.module.scss';
import { useFilters } from '../../shared/hooks/useFilters';
import { useClickOutside } from '../../shared/hooks/useClickOutside';
import { SkillsPopupProps } from './SkillsPopup.types';

const CATEGORY_ORDER: CategoryId[] = [
  'business_and_career',
  'foreign_languages',
  'home_and_comfort',
  'creativity_and_art',
  'education_and_development',
  'health_and_lifestyle'
];

const SkillsPopup: React.FC<SkillsPopupProps> = ({
  onClose,
  skillsMap,
  onChangeFilters,
}) => {
  const [categories, setCategories] = useState<Array<{
    id: CategoryId;
    name: string;
    subcategory: Array<{ id: string; name: string }>;
  }>>([]);
  
  const [loading, setLoading] = useState(true);
  const { filters, toggleFilter } = useFilters({
    skillsMap,
    onChange: onChangeFilters,
  });
  const popupRef = useRef<HTMLDivElement>(null);
  useClickOutside(popupRef, onClose);

  const activeSkills = filters.skill || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/db/skills.json');
        const data = await response.json();
        
        const filteredCategories = data
          .filter((category: any) => CATEGORY_ORDER.includes(category.id));
        
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error loading skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className={styles.skillsPopup__loading}>Загрузка...</div>;

  return (
    <div className={styles.skillsPopup}>
      <div ref={popupRef} className={styles.skillsPopup__content}>
        <div className={styles.skillsPopup__categories}>
          {categories.map(({ id, name, subcategory }) => (
            <div 
              key={id}
              className={`${styles.skillsPopup__category} ${styles[`skillsPopup__category--${id.split('_')[0]}`]}`}
            >
              <div className={styles.skillsPopup__categoryHeader}>
                <div className={styles.skillsPopup__iconWrapper} data-category={id}>
                  <img 
                    src={CATEGORY_ICONS[id]} 
                    alt={name}
                    className={styles.skillsPopup__icon}
                  />
                </div>
                <h3 className={styles.skillsPopup__categoryTitle}>{name}</h3>
              </div>
              <ul className={styles.skillsPopup__skillsList}>
                {subcategory.map(({ id: subId, name: subName }) => (
                  <li
                    key={subId}
                    className={`${styles.skillsPopup__skillItem} ${activeSkills.includes(subId) ? styles['skillsPopup__skillItem--active'] : ''}`}
                    onClick={() => toggleFilter('skill', subId)}
                  >
                    {subName}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPopup;