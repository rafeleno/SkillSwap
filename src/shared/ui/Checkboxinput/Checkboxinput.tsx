import styles from './CheckboxInput.module.scss';
import { CheckboxInputProps } from './Checkboxinput.types';

interface CheckboxSvgProps {
  active: boolean;
}

const CheckboxSvg = ({ active }: CheckboxSvgProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={styles['checkbox-icon']}
      aria-hidden="true"
    >
      <rect
        className={styles['checkbox-outline']}
        x="2" y="2"
        width="20" height="20"
        rx="4"
      />
      <path
        className={styles['checkbox-mark']}
        d="M8 12h8"
        style={{ opacity: active ? 1 : 0 }}
      />
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