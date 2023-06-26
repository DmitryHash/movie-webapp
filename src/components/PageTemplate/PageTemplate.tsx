import { FC, ReactNode, useState } from 'react';
// import { Header } from '../Header/Header'; надо понять, куда и как его вставлять
import { Container } from '../Container/Container';
import { Footer } from '../Footer/Footer';



interface IPageTemplate {
    children?: ReactNode
}

// const [titleMovie, setTitleMovie] = useState("");
// const handleTitleFilm = (newValue: string) => {
//   setTitleMovie(newValue);
// };

export const PageTemplate: FC<IPageTemplate> = ({children}) => (



    <>
{/* <Header handleMoveMain={function (): void {
            throw new Error('Function not implemented.');
        } } handleFilterMovie={function (): void {
            throw new Error('Function not implemented.');
        } } titleFilm={() => {}}/>
              <Header
        handleFilterMovie={handleFilterMovie}
        handleMoveMain={handleMoveMain}
        titleFilm={handleTitleFilm}
      /> */}
        <Container>
            
            {children}
            <Footer />
        </Container>
    </>
)
function handleFilterMovie(): void {
    throw new Error('Function not implemented.');
}

function handleMoveMain(): void {
    throw new Error('Function not implemented.');
}


function handleTitleFilm(newValue: string): void {
    throw new Error('Function not implemented.');
}

