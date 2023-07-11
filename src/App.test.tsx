import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MovieListFilter } from './components/ModalFilter/ModalFilter'


describe ('ModalFilter', () => {

    test('should update searchQuery state when movie title input changes', () => {
        const { getByPlaceholderText } = render(<MovieListFilter />);
        const movieTitleInput: HTMLInputElement | null = getByPlaceholderText('Enter Movie Title') as HTMLInputElement;
    
        fireEvent.change(movieTitleInput, { target: { value: 'Inception' } });
    
        expect(movieTitleInput.value).toBe('Inception');
      });
    
});