import { FC } from 'react';
import './TypographyText.scss';

interface ITypographyText {
    content: string;
    type: 'H1' | 'H2' | 'H3' | 'subline' | 'textPrimary' | 'textSecondary';
}

export const TypographyText: FC<ITypographyText> = ({ content, type }) => {

    const typographyMap = {
        H1: <h1 className={type}>{content}</h1>,
        H2: <h2 className={type}>{content}</h2>,
        H3: <h3 className={type}>{content}</h3>,
        subline: <h4 className={type}>{content}</h4>,
        textPrimary: <p className={type}>{content}</p>,
        textSecondary: <p className={type}>{content}</p>,
    }

    return (
        <>
            {typographyMap[type]}
        </>
    )
};
