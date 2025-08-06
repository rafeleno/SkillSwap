# SkillSwap

SkillSwap — веб-платформа для обмена навыками между пользователями. Пользователи создают профили, ищут и фильтруют навыки, получают уведомления и участвуют в обменах.

### Быстрый старт

```
// Установка зависимостей
npm install

// Запуск в режиме разработки
npm start
```

### Технологии
**React** 
**TypeScript**
**Redux Toolkit**
**React Router v6**
**SCSS Modules**
**Webpack**

### Структура проекта

```
├── public/
│   ├── avatars/              // Аватары пользователей
│   ├── db/                   // Файлы базы данных
│   ├── favicon/              // Иконки сайта
│   └── index.html            // Главный HTML-файл
│
├── spriteCreator/            // Утилита создания SVG-спрайтов
│
├── src/
│   ├── app/                  // Корневой компонент и роутинг
│   ├── assets/               // Шрифты, изображения, SVG
│   ├── pages/                // Страницы приложения
│   ├── services/             // Redux slices, thunks, store
│   ├── shared/               // Хуки, утилиты, UI-компоненты
│   ├── styles/               // SCSS переменные, миксины и типографика
│   └── widgets/              // Виджеты и композиционные блоки
│   ├── custom.d.ts           // Пользовательские глобальные типы
│   ├── index.scss            // Глобальные стили
│   └── index.tsx             // Точка входа приложения
│
├── webpack/                  // Конфигурация Webpack
```

### Основной функционал
- Аутентификация и защита маршрутов
- Уведомления с разделением на новые и прочитанные
- Поиск и фильтрация навыков
- Обмен навыками
- Гибкая модульная архитектура

### Основные директории
# src/app/
- **App.tsx** — корневой компонент
- **router.tsx** — маршрутизация через React Router v6

# src/services/
- **store.ts** — конфигурация Redux Toolkit
- **slices/** — структура по доменам:
- filter/ - фильтрация навыков
- notifications/ - уведомления
- skill/ - управление навыками
- swaps/ - обмены навыками
- user/ - пользовательские данные

(thunks, actions, reducers по соответствующим сущностям)

# src/shared/
Хуки (hooks/):
- **useClickOutside.ts** - хук для обработки кликов вне элемента
- **useFilters.ts** - хук для работы с фильтрами

### Утилиты (lib/)
- **types.ts** — глобальные типы
- **components/** — ProtectedRoute.tsx

### ProtectedRoute
Файл: src/shared/lib/components/ProtectedRoute.tsx

Компонент защищает маршруты на основе авторизации пользователя:

```
export function ProtectedRoute({ onlyUnAuth, children }: ProtectedRouteProps) {
  const user = useSelector(selectCurrentUser)
  const location = useLocation()

  if (!onlyUnAuth && !user) {
    return <Navigate replace to="/login" state={{ from: location }} />
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from?.pathname || '/'
    return <Navigate replace to={from} />
  }

  return children
}
```

### UI-компоненты (ui/)
Примеры:

```
<MainButton text="Перейти" onClick={handleClick} />
<NotificationBell isActive={hasNewNotifications} onClick={toggleModal} />
```

# src/pages/
- **CatalogPage/** - страница каталога навыков
- **FavoritesPage/** - страница избранного
- **LoginPage/** - страница входа
- **MainPage/** - главная страница
- **OnboardingPage/** - онбординг
- **ProfilePage/** - профиль пользователя
- **RegisterPage/** - регистрация
- **SkillPage/** - страница навыка

Страницы ошибок:
- **NotFound404/**
- **NotFound500/**
- **NotFoundPage/**

# src/widgets/
- **Header/** - шапка сайта
- **Footer/** - подвал сайта
- **NotificationModal/** - модальное окно уведомлений
- **NotificationDropdown/** - выпадающий список уведомлений
- **SkillCard/** - карточка навыка
- **SkillsPopup/** - попап навыков
- **Login/** - форма входа
- **RegisterModal/** - модальное окно регистрации

# src/styles/
- **_colors.scss** - цветовая схема приложения
- **_mixins.scss** - SCSS миксины
- **_global.scss** - глобальные стили
- **_typography.scss** - типографика

### Защита маршрутов

```
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>

<Route
  path="/login"
  element={
    <ProtectedRoute onlyUnAuth>
      <LoginPage />
    </ProtectedRoute>
  }
/>
```

### Пример использования Redux

```
import { useSelector, useDispatch } from 'react-redux'
import { selectNotifications, markAsRead } from '@/services/slices/notifications/notificationsSlice'

const { newNotifications } = useSelector(selectNotifications)
const dispatch = useDispatch()
dispatch(markAsRead(id))
```

### Создание нового компонента

```bash
npm run create
```
Выберите тип:
- **ui — базовые элементы (кнопки, инпуты, селекторы)**
- **widgets — составные компоненты (карточки, блоки)**
- **pages — страницы приложения**

Генератор создаст:

```index.ts
[Название].tsx
styles.module.scss
[Название].types.ts
```

### Использование стилей

```
import styles from './styles.module.scss'
<div className={styles.yourClass} />
```

### Советы по разработке
- **Используйте classnames для динамических классов**
- **Повторно используйте хуки из shared/hooks/**
- **UI — в shared/ui/, логика — в shared/hooks/, состояние — в services/slices/**
