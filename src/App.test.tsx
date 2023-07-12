import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from './components/Input/Input';


describe('Input change value', () => {


  test('Function handleChange update value', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <Input title="Name" value="" handleChange={handleChange} />
    );
    const input = getByLabelText('Name') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Bob' } });

    expect(handleChange).toHaveBeenCalledWith('Bob');
  });

});