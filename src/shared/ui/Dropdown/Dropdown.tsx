import clsx from 'clsx';
import styles from './Dropdown.module.scss';
import PointerIcon from '../../../../public/svg/main/chevron-down.svg';
import {DropdownOption, DropdownProps} from './Dropdown.types';

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
    className={clsx(styles.option, {
      [styles.selectedOption]: isSelected,
    })}
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

      <div className={clsx(styles.dropdown, { [styles.expanded]: isExpanded })}>
        <button
          id={id}
          type="button"
          className={clsx(styles.trigger, {
            [styles.borderlessTrigger]: version === 'no-border',
          })}
          onClick={onExpandToggle}
          aria-expanded={isExpanded}
          aria-haspopup="listbox"
        >
          <span className={clsx({ [styles.placeholder]: shouldShowPlaceholder })}>
            {currentDisplayText}
          </span>
          <img
            src={PointerIcon} 
            className={clsx(styles.pointer, {
              [styles.pointerExpanded]: isExpanded,
            })}
            alt="Toggle dropdown"
            aria-hidden="true"
          />
        </button>

        {isExpanded && (
          <ul
            id={`${id}-listbox`}
            className={clsx(styles.optionsList, {
              [styles.borderlessOptions]: version === 'no-border',
              [styles.absolutePosition]: position === 'absolute',
            })}
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