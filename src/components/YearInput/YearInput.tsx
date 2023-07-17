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
    return (
      <div>
        <label>{title}</label>
        <input type="text" value={value} onChange={handleChange} placeholder={placeholder} className={className} />
      </div>
    );
};
