import React, { FC, useState } from 'react';
import { Typography } from '../Typography/Typography';
import Filters from '../../assets/icons/filters.svg';
import { MovieListFilter } from '../MovieListFilter/MovieListFilter';
import { useAppSelector } from '../../store/hooks';
import { isDarktheme } from '../../store/theme/selectors';
import './ModalFilter.scss';

interface IModalProps {
  onClose: () => void;
}

export const ModalFilter: FC<IModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    onClose();
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
            <Typography content='Filter' type='H2' />
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
