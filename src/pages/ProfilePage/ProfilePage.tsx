import type { ProfilePageProps } from './ProfilePage.types'
import { Favorites } from '@widgetComponents/FavoritesComponent'
import { PersonalDataComponent } from '@widgetComponents/PersonalDataComponent'
import { ProfileMenu } from '@widgetComponents/ProfileMenu'
import React from 'react'
import { useParams } from 'react-router-dom'
import styles from './styles.module.scss'

export const ProfilePage: React.FC<ProfilePageProps> = () => {
  const params = useParams<{ id: string, page: string }>()
  return (
    <div className={styles.profilePage}>
      <ProfileMenu />
      {params.page === 'data' && (
        <PersonalDataComponent />
      )}
      {params.page === 'favorites' && (
        <Favorites />
      )}
    </div>
  )
}
// <div className={styles.profile}>
//   <div className={styles.profileForm}>
//     <div className={styles.profileFormInputWrap}>
//       <PrimaryTextInput
//         type="email"
//         state={emailState}
//         label="Почта"
//       />
//     </div>
//     <div className={styles.changePassword}>Изменить пароль</div>
//     <div className={styles.profileFormInputWrap}>
//       <PrimaryTextInput
//         type="regular"
//         state={nameState}
//         label="Имя"
//       />
//     </div>
//     <div style={{ display: 'flex', alignItems: 'end' }}>
//       <div className={styles.profileFormInputWrap}>
//         <Datepicker selectedDate={date} setSelectedDate={setDate} />
//       </div>
//       <div className={styles.profileFormInputWrap}>
//         <label
//           className={styles.label}
//           aria-label="Пол"
//         >
//           Пол
//         </label>
//         <Dropdown
//           options={sexData}
//           selectedOption={sexData.find(element => element.value === genderValue)}
//           onChange={(option: IOption) => {
//             setGenderValue(option.value)
//           }}
//           label="Пол"
//           searchable={false}
//         />
//       </div>
//     </div>
//     <div className={styles.profileFormInputWrap}>
//       <label
//         className={styles.label}
//         aria-label="Город"
//       >
//         Город
//       </label>
//       <Dropdown
//         options={townsData}
//         selectedOption={townsData.find(element => element.value === locationValue)}
//         onChange={(option: IOption) => {
//           setLocationValue(option.value)
//         }}
//         label="Город"
//         searchable={true}
//       />
//     </div>
//     <div className={styles.profileFormInputWrap}>
//       <label
//         htmlFor="description"
//         className={styles.label}
//         aria-label="Описание"
//       >
//         Описание
//       </label>
//       <textarea
//         id="description"
//         className={styles.textarea}
//         rows={4}
//         placeholder="Коротко опишите, чему можете научить"
//         aria-label="Коротко опишите, чему можете научить"
//       />
//     </div>
//     <MainButton
//       type="primary"
//       onClick={() => {}}
//       aria-label="Продолжить"
//     >
//       Сохранить
//     </MainButton>
//   </div>
//   <div className={styles.profileAvatarWrap}>
//     <img
//       className={styles.avatar}
//       src="/assets/images/avatars/personal.png"
//       alt=""
//     />
//     <div className={styles.galleryEdit}>
//       <svg width="24" height="24">
//         <use href="/sprites.svg#gallery-edit" />
//       </svg>
//     </div>
//   </div>
// </div>
