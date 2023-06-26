import { FC, useState } from 'react';
import { LightIcon, DarkIcon, CancelIcon, BurgerMenuIcon} from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import './BurgerMenu.scss';
import { Button } from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { isDarktheme } from '../../store/theme/selectors';
import { toggleThemeAction } from '../../store/theme/actions';
import { IconButton } from '../IconButton/IconButton';
import { ControlledSwitches } from '../Switcher/Switcher';


export const BurgerMenu: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const isDark = useAppSelector(isDarktheme);
    const isLogged = true;

    const options = [
        {id: 1, name: 'Home', url: '/'},
        {id: 2, name: 'Trends', url: '/trends'},
        {id: 3, name: 'Favorites', url: '/favorites'},
        {id: 4, name: 'Settings', url: '/settings'},
    ] 

    const handleClick = () => {
        setIsOpen((prev) => !prev);
    }

    const handleGoTo = (url: string) => {
        navigate(url);
        setIsOpen(false);
    }


    const signIn = () => {
        navigate('/sign-in');
        setIsOpen(false);
    }

    const logout = () => {}


    return (
        <div className='burgerMenu dark light'>
            <div className='burgerMenu__btn-box'>
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
                    {options.map(({id, name, url}) => (
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
                        {/* <button
                            className="burgerMenu__theme-btn"
                            onClick={() => dispatch(toggleThemeAction())}
                            disabled={isDark}
                        >
                            <DarkIcon />
                        </button>
                        <button
                            className="burgerMenu__theme-btn"
                            onClick={() => dispatch(toggleThemeAction())}
                            disabled={!isDark}
                        >
                            <LightIcon />
                        </button> */}
                        <ControlledSwitches />
                    </div>
                        {isLogged ? (
                            <Button
                                content='Log Out'
                                onClick={logout}
                        type='secondary'/>
                    ) : (
                        <Button
                            content='Sign In'
                            onClick={signIn}
                            type='primary'
                        />
                    )}
                </div>
            </div>
        </div>
    )
};
