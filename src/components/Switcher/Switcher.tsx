import * as React from 'react';
import Switch from '@mui/material/Switch';
import { useAppDispatch } from '../../store/hooks';
import { toggleThemeAction } from '../../store/theme/actions';

export const ControlledSwitches = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
