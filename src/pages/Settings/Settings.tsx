import { FC, useEffect, useRef, useState } from 'react';
import './Settings.scss';
import { TypographyText } from '../../components/Typography/TypographyText';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';
import { Logotype } from '../../assets/icons';
import { Link } from 'react-router-dom';


interface IError {
    username: string | string[];
    email: string | string[];
    password: string | string[];
    newPassword: string | string[];
    confirmPassword: string | string[];
}

export const Settings: FC = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassowrd] = useState('');

    const [errors, setErrors] = useState<IError>({
        username: '',
        email: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
    });

    const inputUserNameRef = useRef<HTMLInputElement>(null);
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const inputNewPasswordRef = useRef<HTMLInputElement>(null);
    const inputConfirmPasswordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputUserNameRef.current) {
            inputUserNameRef.current.focus();
        }
    }, []);

    const handleChangeName = (newValue: string) => {
        setUserName(newValue);
        setErrors(errors => ({ ...errors, username: '', detail: '' }));
    }

    const handleChangeEmail = (newValue: string) => {
        setEmail(newValue);
        setErrors(errors => ({ ...errors, email: '', detail: '' }));

    }

    const handleChangePassword = (newValue: string) => {
        setPassword(newValue);
        setErrors(errors => ({ ...errors, password: '', detail: '' }));

    }

    const handleChangeNewPassword = (newValue: string) => {
        setNewPassword(newValue);
        setErrors(errors => ({ ...errors, newPassword: '', detail: '' }));

    }

    const handleChangeConfirmPassword = (newValue: string) => {
        setConfirmPassowrd(newValue);
        setErrors(errors => ({ ...errors, confirmPassword: '', detail: '' }));

    }

    const validateForm = () => {
        const newErrors: IError = {
            username: '',
            email: '',
            password: '',
            newPassword: '',
            confirmPassword: ''
        }

        if (!username) {
            newErrors.username = 'Name is required';
        }
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
        if (!newPassword) {
            newErrors.newPassword = 'New password is required'
        } else if (newPassword === password && newPassword !== confirmPassword) {
            newErrors.newPassword = 'Incorrect new password'
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            newErrors.password = 'Passwords do not match';
        }

        let isValid = Object.values(newErrors).every(error => error === '');
        if (isValid) {
            return true;
        } else {
            setErrors(newErrors);
            return false;
        }
    }

    const handleSumbit = () => {
        validateForm();
    }

    const handleCleareForm = () => {
        setUserName('');
        setEmail('');
        setPassword('');
        setNewPassword('');
        setConfirmPassowrd('');
    }

    return (
        <>
            <div className='settings'>
                <div className="mainLogo">
                    <Link to={'/'}><Logotype /></Link>
                </div>
                <Header handleFilterMovie={() => { }} handleMoveMain={() => { }} titleFilm={() => { }} />
                <TypographyText content='Profile' type='H1' />
                <form className='settings__form-profile'>
                    <Input
                        title='Name'
                        value={username}
                        handleChange={handleChangeName}
                        placeholder='Enter your Name'
                        errorMessage={errors.username}
                        inputRef={inputUserNameRef}
                    />
                    <Input
                        title='Email'
                        value={email}
                        handleChange={handleChangeEmail}
                        placeholder='Enter your Email'
                        errorMessage={errors.email}
                        inputRef={inputEmailRef}

                    />
                </form>
                <TypographyText content='Password' type='H2' />
                <form className='settings__form-password'>
                    <Input
                        title='Password'
                        value={password}
                        handleChange={handleChangePassword}
                        placeholder='Enter your password'
                        errorMessage={errors.password}
                        inputRef={inputPasswordRef}

                    />
                    <Input
                        title='New Password'
                        value={newPassword}
                        handleChange={handleChangeNewPassword}
                        placeholder='Enter your new password'
                        errorMessage={errors.newPassword}
                        inputRef={inputNewPasswordRef}

                    />
                    <Input
                        title='Confirm password'
                        value={confirmPassword}
                        handleChange={handleChangeConfirmPassword}
                        placeholder='Confirm your new password'
                        errorMessage={errors.confirmPassword}
                        inputRef={inputConfirmPasswordRef}

                    />
                </form>
                <div className='settings_btn'>
                    <Button content='Save' type='primary' onClick={handleSumbit} />
                    <Button content='Clear' type='secondary2' onClick={handleCleareForm} />
                </div>
            </div>
        </>
    )
};
