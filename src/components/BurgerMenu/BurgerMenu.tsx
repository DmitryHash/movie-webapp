import { FC, useState } from 'react';
import { CancelIcon, BurgerMenuIcon } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { isDarktheme } from '../../store/theme/selectors';
import { IconButton } from '../IconButton/IconButton';
import { ControlledSwitches } from '../Switcher/Switcher';
import './BurgerMenu.scss';


export const BurgerMenu: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const isDark = useAppSelector(isDarktheme);

    const options = [
        {  id: 1, name: 'Home', url: '/' },
        { id: 3, name: 'Favorites', url: '/favorites' },
        { id: 4, name: 'Settings', url: '/settings' },
    ]

    const handleClick = () => {
        setIsOpen((prev) => !prev);
    }

    const handleGoTo = (url: string) => {
        navigate(url);
        setIsOpen(false);
    }


    return (
        <div className={`burgerMenu ${isDark ? 'dark' : 'light'}`}>
            <div className={`burgerMenu__btn-box ${isDark ? 'dark' : 'light'}`}>
                <IconButton onClick={handleClick} type='header'>
                    {isOpen ? (
                        <CancelIcon />
                    ) : (
                        <BurgerMenuIcon />
                    )}
                </IconButton>
            </div>
            <div className={`burgerMenu__content ${isOpen && 'open'}`}>
                <nav className="burgerMenu__nav">
                    {options.map(({ id, name, url }) => (
                        <li key={id} className='burgerMenu__nav-item'>
                            <button className='burgerMenu__nav-btn' onClick={() => handleGoTo(url)}>
                                {name}
                            </button>
                        </li>
                    ))}
                </nav>
                <div>
                    <div className="burgerMenu__theme-box">
                        Night mode
                        <ControlledSwitches />
                    </div>
                </div>
            </div>
        </div>
    )
};
