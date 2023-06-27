// Header.tsx
import { FC } from 'react';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { UserInfo } from '../UserInfo/UserInfo';
import { IconButton } from '../IconButton/IconButton';
import { CancelIcon, UserIcon, Logotype } from '../../assets/icons';
import { useNavigate } from 'react-router';
import './Header.scss';
import { ModalFilter } from '../ModalFilter/ModalFilter';
import { useAppSelector } from '../../store/hooks';
import { isDarktheme } from '../../store/theme/selectors';


interface IHeader {
  handleMoveMain: () => void;
  handleFilterMovie: () => void;
  titleFilm: (newValue: string) => void;
  isSearchDisabled?: boolean;
}

export const Header: FC<IHeader> = ({
  handleMoveMain,
  handleFilterMovie,
  titleFilm,
  isSearchDisabled = false
}) => {
  const navigate = useNavigate();
  const isLogged = false;
  const isDark = useAppSelector(isDarktheme);

  const handleClickToSignIn = () => {
    navigate('/sign-in');
  };

  const handleClickToHome = () => {
    navigate('/posts');
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
          <UserInfo username="Dmitry Podolnitski " />
        ) : (
          <IconButton onClick={handleClickToSignIn} type="header">
            <UserIcon />
          </IconButton>
        )}
      </div>
    </header>
  );
};
