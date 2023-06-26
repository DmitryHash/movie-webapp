import React, { FC, useState } from 'react';
import './ModalFilter.scss';
import { TypographyText } from '../Typography/TypographyText';
import { Input } from '../Input/Input';
import  Filters  from '../../assets/icons/filters.svg';
import { MovieListFilter } from '../YearFilter/YearFilter';
// import { YearInput, MovieList } from '../YearFilter/YearFilter';

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

  
    return (
      <>
        <button onClick={openModal} className='open-btn'><img src={Filters} alt='Filter'/></button>
        {isOpen && (
          <div className={`modal-overlay ${modalStyles}`}>
            <div className="modal-content">
              <div className='modal-content-header'>
              <TypographyText content='Filters' type='H2'/>
              <button className='modal-content-header-close-btn' onClick={closeModal}>X</button>
              </div>
              <MovieListFilter />
              <div className='modal-content-border'></div>
              <div className='modal-content-year'>
              <Input title='' value={yearStart} handleChange={handleChangeYearStart} placeholder='From'/>
              <Input handleChange={handleChangeYearEnd} title='' value={yearEnd} placeholder='To'/>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
