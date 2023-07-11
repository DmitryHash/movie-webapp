import { ChangeEvent, FC } from 'react';
import './YearInput.scss';

interface IYearInput {
}

export const YearInput = ({
    title,
    value,
    handleChange,
    placeholder,
    errorMessage,
    className,
  }: {
    title: string;
    value: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    errorMessage?: string | string[];
    className: string;
  }) => {

    const generatErrorMessage = (message: string | string[]) => typeof message === 'string' ? message : message.join(' ');
    return (
      <div>
        <label>{title}</label>
        <input type="text" value={value} onChange={handleChange} placeholder={placeholder} className={className} />
      </div>
    );
};
