import { FC } from 'react';
import { TypographyText } from '../../components/Typography/TypographyText';
import { SearchList } from './components/SearchList/SearchList';

export const SearchPage: FC = () => {
    return (
        <>
            <TypographyText content='Search results ‘Astronauts’' type='H1'/>
            <SearchList />
        </>
    )
};
