import React, { useEffect, useRef, KeyboardEvent, forwardRef } from 'react';
import styles from './styles.module.scss';

export type DropdownVersion = 'default' | 'no-border';
export type DropdownPosition = 'relative' | 'absolute';

export interface DropdownOption {
  value: string;
  label: string;
  content?: React.ReactNode;
}

export interface DropdownProps {
  id: string;
  options: DropdownOption[];
  selectedValue?: string;
  onSelect?: (value: string) => void;
  label?: string;
  placeholder?: string;
  isExpanded: boolean;
  onExpandToggle: () => void;
  displayText?: string;
  version?: DropdownVersion;
  position?: DropdownPosition;
}

interface DropdownOptionItemProps {
  option: DropdownOption;
  isSelected: boolean;
  isFocused?: boolean;
  onSelect: (value: string) => void;
}

const DropdownOptionItem = forwardRef<HTMLLIElement, DropdownOptionItemProps>(
  ({ option, isSelected, isFocused, onSelect }, ref) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
      if (['Enter', ' '].includes(e.key)) {
        e.preventDefault();
        onSelect(option.value);
      }
    };

    return (
      <li
        ref={ref}
        className={`${styles.option} ${isSelected ? styles.selectedOption : ''} ${
          isFocused ? styles.focusedOption : ''
        }`}
        onClick={() => onSelect(option.value)}
        onKeyDown={handleKeyDown}
        role="option"
        aria-selected={isSelected}
        tabIndex={isFocused ? 0 : -1}
      >
        {option.content || option.label}
      </li>
    );
  }
);

DropdownOptionItem.displayName = 'DropdownOptionItem';

export const Dropdown: React.FC<DropdownProps> = ({
  id,
  options,
  selectedValue,
  onSelect,
  label,
  placeholder = 'Select an option',
  isExpanded,
  onExpandToggle,
  displayText,
  version = 'default',
  position = 'relative',
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);

  useEffect(() => {
    if (isExpanded) {
      setFocusedIndex(options.findIndex(opt => opt.value === selectedValue));
    } else {
      setFocusedIndex(-1);
    }
  }, [isExpanded, options, selectedValue]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!isExpanded) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        onExpandToggle();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => Math.min(prev + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && options[focusedIndex]) {
          handleOptionSelect(options[focusedIndex].value);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onExpandToggle();
        break;
      case 'Tab':
        onExpandToggle();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const handleOptionSelect = (value: string) => {
    onSelect?.(value);
    onExpandToggle();
  };

  if (!id) {
    console.error('Dropdown component requires an id prop');
    return null;
  }

  if (!options.length) {
    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.empty}>No options available</div>
      </div>
    );
  }

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayContent = displayText || selectedOption?.label || placeholder;
  const shouldShowPlaceholder = !selectedValue && !displayText;

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.dropdown}>
        <button
          id={id}
          type="button"
          className={`${styles.trigger} ${
            version === 'no-border' ? styles.borderlessTrigger : ''
          }`}
          onClick={onExpandToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={isExpanded}
          aria-haspopup="listbox"
          aria-controls={`${id}-listbox`}
        >
          <span className={`${shouldShowPlaceholder ? styles.placeholder : ''}`}>
            {displayContent}
          </span>
          <svg
            className={`${styles.pointer} ${
              isExpanded ? styles.pointerExpanded : ''
            }`}
            aria-hidden="true"
            width="16"
            height="16"
          >
            <use xlinkHref="/svg/sprite.svg#chevron-down" />
          </svg>
        </button>

        <ul
          id={`${id}-listbox`}
          className={`${styles.optionsList} ${
            version === 'no-border' ? styles.borderless : ''
          } ${
            position === 'absolute' ? styles.absolutePosition : ''
          } ${isExpanded ? styles.expanded : ''}`}
          role="listbox"
          aria-labelledby={id}
        >
          {options.map((option, index) => (
            <DropdownOptionItem
              key={option.value || `option-${index}`}
              ref={(el: HTMLLIElement | null) => {
                optionRefs.current[index] = el;
              }}
              option={option}
              isSelected={option.value === selectedValue}
              isFocused={focusedIndex === index}
              onSelect={handleOptionSelect}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};