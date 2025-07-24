import styles from './Dropdown.module.scss';
import { DropdownOption, DropdownProps } from './Dropdown.types';

const DropdownOptionItem = ({
  option,
  isSelected,
  onSelect,
}: {
  option: DropdownOption;
  isSelected: boolean;
  onSelect: (value: string) => void;
}) => (
  <li
    className={`${styles.option} ${isSelected ? styles.selectedOption : ''}`}
    onClick={() => onSelect(option.value)}
    role="option"
    aria-selected={isSelected}
  >
    {option.content || option.label}
  </li>
);

export const Dropdown = ({
  id,
  options,
  selectedValue,
  onSelect,
  label,
  placeholder,
  isExpanded,
  onExpandToggle,
  displayText,
  version = 'default',
  position = 'relative',
}: DropdownProps) => {
  const handleOptionSelect = (value: string) => {
    onSelect?.(value);
    onExpandToggle();
  };

  const currentDisplayText = displayText || placeholder;
  const shouldShowPlaceholder = !selectedValue && !displayText;

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={`${styles.dropdown} ${isExpanded ? styles.expanded : ''}`}>
        <button
          id={id}
          type="button"
          className={`${styles.trigger} ${version === 'no-border' ? styles.borderlessTrigger : ''}`}
          onClick={onExpandToggle}
          aria-expanded={isExpanded}
          aria-haspopup="listbox"
        >
          <span className={`${shouldShowPlaceholder ? styles.placeholder : ''}`}>
            {currentDisplayText}
          </span>
          <svg
            className={`${styles.pointer} ${isExpanded ? styles.pointerExpanded : ''}`}
            aria-hidden="true"
          >
            <use href="/svg/main/chevron-down.svg#icon" />
          </svg>
        </button>

        {isExpanded && (
          <ul
            id={`${id}-listbox`}
            className={`${styles.optionsList} ${
              version === 'no-border' ? styles.borderlessOptions : ''
            } ${position === 'absolute' ? styles.absolutePosition : ''}`}
            role="listbox"
            aria-labelledby={id}
          >
            {options.map((option) => (
              <DropdownOptionItem
                key={option.value}
                option={option}
                isSelected={option.value === selectedValue}
                onSelect={handleOptionSelect}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};