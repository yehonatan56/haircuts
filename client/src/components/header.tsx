import { ReactNode } from 'react';
import Navbar from './navbar.tsx';

interface HeaderProps {
    children: ReactNode;
}
export default function Header({ children }: HeaderProps) {
    return (
        <div>
            {children}
            <Navbar />
        </div>
    );
}
