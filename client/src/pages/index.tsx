import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './home.tsx';
import Header from '../components/header.tsx';
import Add from './add.tsx';
import List from './list.tsx';

export default function Pages() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <Header>
                    <Home />
                </Header>
            ),
        },
        {
            path: '/add',
            element: (
                <Header>
                    <Add />
                </Header>
            ),
        },
        {
            path: '/list',
            element: (
                <Header>
                    <List />
                </Header>
            ),
        },
    ]);
    return <RouterProvider router={router} />;
}
