import { FC } from 'react';
import './Footer.scss';
import { TypographyText } from '../Typography/TypographyText';

export const Footer: FC = () => {
    return (
        <footer className='footer'>
            <div className='footer__text'>
                <TypographyText content='© All Rights Reserved' type='subline' />
            </div>
        </footer>
    )
};
