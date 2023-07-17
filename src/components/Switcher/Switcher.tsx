import React, { useState, ChangeEvent } from 'react';
import Switch from '@mui/material/Switch';
import { useAppDispatch } from '../../store/hooks';
import { toggleThemeAction } from '../../store/theme/actions';

export const ControlledSwitches = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  const dispatch = useAppDispatch();

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      onClick={() => dispatch(toggleThemeAction())}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}
