import { FC,ReactNode } from 'react';
import './ShowMore.scss';

interface IShowMore {
    children:ReactNode;
    content:string;
    handleClick:()=>void;
}

export const ShowMore: FC<IShowMore> = ({children,content,handleClick}) => {
    return (
        <button className='show-more' onClick={handleClick}><p>{content}</p>{children}</button>
    )
};
