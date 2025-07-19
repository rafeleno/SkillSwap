export interface MainButtonProps {
  type: 'accent' | 'white' | 'tag';
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}
