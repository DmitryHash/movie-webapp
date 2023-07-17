import { FC } from 'react';
import './Footer.scss';
import { Typography } from '../Typography/Typography';

export const Footer: FC = () => {
    return (
        <footer className='footer'>
            <div className='footer__text'>
                <Typography content='© All Rights Reserved' type='subline' />
            </div>
        </footer>
    )
};
