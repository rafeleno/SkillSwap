import type { CategoryId } from './CategoryIcons'
import type { SkillsPopupProps } from './SkillsPopup.types'
import React, { useEffect, useRef } from 'react'
import { selectAllCategories } from '../../services/slices/skill/skillSlice'
import { fetchSkills } from '../../services/slices/skill/thunks'
import { useDispatch, useSelector } from '../../services/store'
import { useClickOutside } from '../../shared/hooks/useClickOutside'
import { CATEGORY_ICONS } from './CategoryIcons'
import styles from './styles.module.scss'

const CATEGORY_ORDER: CategoryId[] = [
  'business',
  'languages',
  'home',
  'art',
  'education',
  'health',
]

const SkillsPopup: React.FC<SkillsPopupProps> = ({
  onClose,
  // onChangeFilters,
}) => {
  const dispatch = useDispatch()
  const categories = useSelector(selectAllCategories)
  const status = useSelector(state => state.skills.status)
  const error = useSelector(state => state.skills.error)
  // const normalizedSkillsMap = React.useMemo(() => {
  //   return skillsMap.map(skill => ({
  //     ...skill,
  //     children: skill.children || [],
  //   }))
  // }, [skillsMap])

  // const { filters, toggleFilter } = useFilters({
  //   skillsMap: normalizedSkillsMap,
  //   onChange: () => {},
  //   filters: initialFilters,
  //   setFilters: () => {},
  // })

  const popupRef = useRef<HTMLDivElement>(null)
  useClickOutside(popupRef, onClose)

  // const activeSkills = filters.skill || []

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
          {filteredCategories.map(({ id, name, children }) => (
            <div
              key={id}
              className={`${styles['skills-popup__category']} ${styles[`skills-popup__category-${id.split('_')[0]}`]}`}
            >
              <div className={styles['skills-popup__category-header']}>
                <div className={styles['skills-popup__iconWrapper']} data-category={id}>
                  <img
                    src={CATEGORY_ICONS[id as CategoryId]}
                    alt={name}
                    className={styles['skills-popup__icon']}
                  />
                </div>
                <h2 className={styles['skills-popup__categoryTitle']}>{name}</h2>
              </div>
              <ul className={styles['skills-popup__skillsList']}>
                {children.map(({ id: subId, name: subName }) => (
                  <li
                    key={subId}
                    // className={`${styles['skills-popup__skillItem']} ${activeSkills.includes(subId) ? styles['skills-popup__skillItem-active'] : ''}`}
                    // onClick={() => toggleFilter('skill', subId)}
                    className={`${styles['skills-popup__skillItem']}`}
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
  )
}

export default SkillsPopup
