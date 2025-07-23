export interface RadioInputProps {
  name: string;
  value: string;
  checked?: boolean;
  children: React.ReactNode;
  onChange?: (value: string) => void;
}