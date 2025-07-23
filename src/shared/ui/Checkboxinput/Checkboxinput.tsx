import styles from './CheckboxInput.module.scss';
import { CheckboxInputProps } from './Checkboxinput.types';

interface CheckboxSvgProps {
  active: boolean;
}

const CheckboxSvg = ({ active }: CheckboxSvgProps) => {
  const iconName = active ? 'checkbox-remove' : 'checkbox-empty';

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={styles['checkbox-icon']}
      aria-hidden="true"
    >
      <use href={`/${iconName}.svg#${iconName}`} />
    </svg>
  );
};

export const CheckboxInput = ({ 
  children,
  active = false,
  onChange
}: CheckboxInputProps) => (
  <label className={styles.label}>
    <input
      type="checkbox"
      checked={active}
      onChange={onChange}
      className={styles.input}
      readOnly={!onChange}
    />
    <CheckboxSvg active={active} />
    <span className={styles.text}>{children}</span>
  </label>
);