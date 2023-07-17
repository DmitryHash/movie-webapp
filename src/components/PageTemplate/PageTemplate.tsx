import { FC, ReactNode, useState } from 'react';
import { Container } from '../Container/Container';
import { Footer } from '../Footer/Footer';


interface IPageTemplate {
    children?: ReactNode
}

export const PageTemplate: FC<IPageTemplate> = ({ children }) => (
    <Container>
        {children}
        <Footer />
    </Container>
)

