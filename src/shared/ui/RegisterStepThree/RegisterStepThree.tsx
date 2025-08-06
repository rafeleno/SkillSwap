import type { IOption } from '@uiComponents/Dropdown/Dropdown.types'
import type { RegisterStepThreeProps } from './RegisterStepThree.types'
import schoolBoardImage from '@images/modalImages/school-board.png'
import { Dropdown } from '@uiComponents/Dropdown'
import { MainButton } from '@uiComponents/MainButton'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { fetchSkills } from 'services/slices/skill/thunks'
import { selectAllCategories, selectSkillsStatus } from '../../../services/slices/skill/skillSlice';
import { AppDispatch } from '../../../services/store';
import { RegisterContext } from '../../contexts/RegisterContext/RegisterContext'

export const RegisterStepThree: React.FC<RegisterStepThreeProps> = ({
  onPrev,
  onSubmit,
}) => {
  const { stepThreeStates } = useContext(RegisterContext);

  const [selectedCategory, setSelectedCategory] = stepThreeStates.selectedCategoryState;
  const [selectedSubcategory, setSelectedSubcategory] = stepThreeStates.selectedSubcategoryState;
  const [categories, setCategories] = stepThreeStates.categoriesState;
  const [subcategories, setSubcategories] = stepThreeStates.subcategoriesState;
  const [files, setFiles] = stepThreeStates.filesState;
  const [dragActive, setDragActive] = stepThreeStates.dragActiveState;

  // Получаем данные из Redux store
  const skillData = useSelector(selectAllCategories);
  const skillsStatus = useSelector(selectSkillsStatus);
  const dispatch = useDispatch<AppDispatch>();

  // Загружаем данные о навыках при монтировании компонента
  useEffect(() => {
    if (skillData.length === 0 && skillsStatus === 'idle') {
    }
  }, [dispatch, skillData.length, skillsStatus]);

  // Обновляем категории при получении данных из store
  useEffect(() => {
    if (skillData.length > 0) {
      const categoryOptions = skillData.map(category => ({
        id: category.id,
        value: category.name,
      }))
      setCategories(categoryOptions)
    }
  }, [skillData])

  const handleCategoryChange = (option: IOption) => {
    setSelectedCategory(option)
    setSelectedSubcategory(null)
    const originalCategory = skillData.find(cat => cat.id === option.id)
    if (originalCategory && originalCategory.children) {
      const subcategoryOptions = originalCategory.children.map(sub => ({
        id: sub.id,
        value: sub.name,
      }))
      setSubcategories(subcategoryOptions)
    }
    else {
      setSubcategories([])
    }
  }

  const handleSubcategoryChange = (option: IOption) => {
    setSelectedSubcategory(option)
  }

  const handleFilesChange = (event) => {
    event.preventDefault()
    if (event.target.files && event.target.files[0]) {
      setFiles([...event.target.files])
    }
  }

  const handleDrag = (event) => {
    event.preventDefault()
    setDragActive(true)
  }

  const handleLeave = (event) => {
    event.preventDefault()
    setDragActive(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragActive(false)
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFiles([...event.dataTransfer.files])
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={onSubmit}>
          <label
            htmlFor="skill-name"
            className={styles.label}
            aria-label="Название навыка"
          >
            Название навыка
          </label>
          <input
            type="text"
            id="skill-name"
            className={styles.input}
            placeholder="Введите название вашего навыка"
            aria-label="Введите название вашего навыка"
          />
          <span className={styles.label} aria-label="Категория навыка">
            Категория навыка
          </span>
          <div className={styles.dropdownContainer}>
            <Dropdown
              options={categories}
              selectedOption={selectedCategory}
              onChange={handleCategoryChange}
              searchable={false}
              label="Выберите категорию навыка"
              aria-label="Выберите категорию навыка"
            />
          </div>
          <span className={styles.label} aria-label="Подкатегория навыка">
            Подкатегория навыка
          </span>
          <div className={styles.dropdownContainer}>
            <Dropdown
              options={subcategories}
              selectedOption={selectedSubcategory}
              onChange={handleSubcategoryChange}
              searchable={false}
              label="Выберите подкатегорию навыка"
              aria-label="Выберите подкатегорию навыка"
            />
          </div>
          <label
            htmlFor="description"
            className={styles.label}
            aria-label="Описание"
          >
            Описание
          </label>
          <textarea
            id="description"
            className={styles.textarea}
            rows={3}
            placeholder="Коротко опишите, чему можете научить"
            aria-label="Коротко опишите, чему можете научить"
          />
          <div
            className={`${styles.fileupload} ${dragActive ? styles.drag : ''
              }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleLeave}
            onDrop={handleDrop}
            aria-label="Перетащите или выберите изображения навыка"
          >
            <span className={styles.placeholder}>
              Перетащите или выберите изображения навыка
            </span>
            <label className={styles.fileLabel}>
              <span className={styles.span}>
                <svg className={styles.icon}>
                  <use href={`#icon-${'gallery-add'}`} />
                </svg>
                Выбрать изображения
              </span>
              <input
                type="file"
                id="drag-and-drop"
                className={styles.hiddenInput}
                multiple={true}
                onChange={handleFilesChange}
                aria-label="Выберите изображения навыка"
              />
            </label>
            {files.length > 0 && (
              <ul className={styles.list}>
                {files.map(({ name }, id) => (
                  <li key={id} aria-label={`Файл: ${name}`}>
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.buttonContainer}>
            <MainButton
              type="secondary"
              onClick={onPrev}
              aria-label="Назад"
            >
              Назад
            </MainButton>
            <MainButton
              type="primary"
              onClick={() => { }}
              aria-label="Продолжить"
            >
              Продолжить
            </MainButton>
          </div>
        </form>
      </div>
      <div className={styles.onboarding}>
        <img
          className={styles.image}
          src={schoolBoardImage}
          alt="Обучение"
        />
        <h2 className={styles.title}>Укажите, чем вы готовы поделиться</h2>
        <h4 className={styles.subtitle}>
          Так другие люди смогут увидеть ваши предложения и предложить вам обмен!
        </h4>
      </div>
    </div>
  )
}
