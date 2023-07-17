import { FC } from 'react';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { UserInfo } from '../UserInfo/UserInfo';
import { IconButton } from '../IconButton/IconButton';
import { UserIcon } from '../../assets/icons';
import { useNavigate } from 'react-router';
import { ModalFilter } from '../ModalFilter/ModalFilter';
import { useAppSelector } from '../../store/hooks';
import { isDarktheme } from '../../store/theme/selectors';
import './Header.scss';


interface IHeader {
  titleFilm: (newValue: string) => void;
  isSearchDisabled?: boolean;
}

export const Header: FC<IHeader> = ({
  titleFilm,
  isSearchDisabled = false
}) => {
  const navigate = useNavigate();
  const isLogged = false;
  const isDark = useAppSelector(isDarktheme);

  const handleClickToSignIn = () => {
    navigate('/sign-in');
  };


  const inputClass = `search-input ${isSearchDisabled && 'search-film__disabled'}`;

  return (
    <header className={`header ${isDark ? 'dark' : 'light'}`}>
      <BurgerMenu />
      <div className="search">
        <div className="search__input">
          <div className='moodal'>
            <ModalFilter onClose={() => { }} />
          </div>
          <input
            className={inputClass}
            type="text"
            placeholder="search"
            disabled={isSearchDisabled}
            onChange={(e) => titleFilm(e.target.value)}
          />
        </div>
      </div>

      <div className="header__box">
        {isLogged ? (
          <UserInfo username="Dmitry Podolnitski" />
        ) : (
          <IconButton onClick={handleClickToSignIn} type="header">
            <UserIcon />
          </IconButton>
        )}
      </div>
    </header>
  );
};
