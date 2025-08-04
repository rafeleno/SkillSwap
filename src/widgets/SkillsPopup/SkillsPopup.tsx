import React, { useRef, useEffect } from 'react';
import { CATEGORY_ICONS, CategoryId } from './CategoryIcons';
import styles from './styles.module.scss';
import { useFilters } from '../../shared/hooks/useFilters';
import { useClickOutside } from '../../shared/hooks/useClickOutside';
import type { SkillsPopupProps } from './SkillsPopup.types';
import { fetchSkills } from '../../services/slices/skill/thunks';
import { useDispatch, useSelector } from '../../services/store';

const CATEGORY_ORDER: CategoryId[] = [
  'business_and_career',
  'foreign_languages',
  'home_and_comfort',
  'creativity_and_art',
  'education_and_development',
  'health_and_lifestyle',
]

const SkillsPopup: React.FC<SkillsPopupProps> = ({
  onClose,
  skillsMap = [],
  onChangeFilters,
}) => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.skills.categories)
  const status = useSelector(state => state.skills.status)
  const error = useSelector(state => state.skills.error)

  const normalizedSkillsMap = React.useMemo(() => {
    return skillsMap.map(skill => ({
      ...skill,
      children: skill.children || [],
    }))
  }, [skillsMap])

  const { filters, toggleFilter } = useFilters({
    skillsMap: normalizedSkillsMap,
    onChange: onChangeFilters,
  })

  const popupRef = useRef<HTMLDivElement>(null)
  useClickOutside(popupRef, onClose)

  const activeSkills = filters.skill || []

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSkills())
    }
  }, [status, dispatch])

  if (status === 'loading')
    return <div className={styles['skills-popup__loading']}>Загрузка...</div>
  if (status === 'failed') {
    return (
      <div className={styles.empty}>
        Ошибка:
        {error}
      </div>
    )
  }
  if (categories.length === 0 && status === 'succeeded') {
    return <div className={styles.empty}>Нет доступных навыков</div>
  }

  const filteredCategories = categories
    .filter(category => CATEGORY_ORDER.includes(category.id as CategoryId))
    .sort((a, b) => CATEGORY_ORDER.indexOf(a.id as CategoryId) - CATEGORY_ORDER.indexOf(b.id as CategoryId))

  return (
    <div className={styles['skills-popup']}>
      <div ref={popupRef} className={styles['skills-popup__content']}>
        <div className={styles['skills-popup__categories']}>
          {filteredCategories.map(({ id, name, subcategory }) => (
            <div
              key={id}
              className={`${styles['skills-popup__category']} ${styles[`skills-popup__category-${id.split('_')[0]}`]}`}
            >
              <div className={styles['skills-popup__categoryHeader']}>
                <div className={styles['skills-popup__iconWrapper']} data-category={id}>
                  <img
                    src={CATEGORY_ICONS[id as CategoryId]}
                    alt={name}
                    className={styles['skills-popup__icon']}
                  />
                </div>
                <h3 className={styles['skills-popup__categoryTitle']}>{name}</h3>
              </div>
              <ul className={styles['skills-popup__skillsList']}>
                {subcategory.map(({ id: subId, name: subName }) => (
                  <li
                    key={subId}
                    className={`${styles['skills-popup__skillItem']} ${activeSkills.includes(subId) ? styles['skills-popup__skillItem-active'] : ''}`}
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
