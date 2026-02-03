/**
 * Добавляет правильный prefix к путям ассетов для работы на GitHub Pages.
 * В production добавляет /SkillSwap, в development оставляет путь как есть.
 *
 * @param path - путь к ассету (например, '/assets/images/avatar.jpg')
 * @returns путь с правильным prefix
 */
// eslint-disable-next-line antfu/top-level-function
export const getAssetPath = (path: string | null | undefined): string => {
  if (!path) {
    return ''
  }

  // Если путь уже относительный (не начинается с /), возвращаем как есть
  if (!path.startsWith('/')) {
    return path
  }

  // В production webpack заменяет process.env.PUBLIC_URL на '/SkillSwap'
  // eslint-disable-next-line
  const basePath = process.env.PUBLIC_URL || ''

  return `${basePath}${path}`
}

export default getAssetPath
