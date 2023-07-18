import { ChangeEvent } from 'react';
import './YearInput.scss';

export const YearInput = ({
  title,
  value,
  handleChange,
  placeholder,
  className,
}: {
  title: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  errorMessage?: string | string[];
  className: string;
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    handleChange({ ...e, target: { ...e.target, value: inputValue } });
  };

  return (
    <div>
      <label>{title}</label>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
};
