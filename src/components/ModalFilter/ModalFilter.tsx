import React, { FC, useState } from 'react';
import './ModalFilter.scss';
import { TypographyText } from '../Typography/TypographyText';
import { Input } from '../Input/Input';
import Filters from '../../assets/icons/filters.svg';
import { MovieListFilter } from '../YearFilter/YearFilter';
import { useAppSelector } from '../../store/hooks';
import { isDarktheme } from '../../store/theme/selectors';

interface IModalProps {
  onClose: () => void;
}

export const ModalFilter: FC<IModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [yearStart, setYearStart] = useState('');
  const [yearEnd, setYearEnd] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  const handleChangeYearStart = (newValue: string) => {
    setYearStart(newValue);
  };

  const handleChangeYearEnd = (newValue: string) => {
    setYearEnd(newValue);
  };

  const modalStyles = isOpen ? 'modal-open' : '';
  const isDark = useAppSelector(isDarktheme);

  return (
    <>
      <button onClick={openModal} className='open-btn'>
        <img src={Filters} alt='Filter' />
      </button>
      <div className={`modal-overlay ${isDark ? 'dark' : 'light'} ${isOpen ? 'modal-open' : ''}`}>
        <div className={`modal-content ${modalStyles}`}>
          <div className='modal-content-header'>
            <TypographyText content='Filters' type='H2' />
            <button className='modal-content-header-close-btn' onClick={closeModal}>
              X
            </button>
          </div>
          <MovieListFilter />
        </div>
      </div>
    </>
  );
};

export { MovieListFilter };
