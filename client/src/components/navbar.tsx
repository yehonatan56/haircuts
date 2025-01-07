import { Box, Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { Home, Plus, List } from 'tabler-icons-react';

export default function Navbar() {
    const links = [
        { path: '/', label: 'Home', icon: <Home size={24} /> },
        { path: '/add', label: 'Add', icon: <Plus size={24} /> },
        { path: '/list', label: 'List', icon: <List size={24} /> },
    ];

    return (
        <Box
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                height: 60,
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #eaeaea',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}
        >
            {links.map((link) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: '#333',
                    }}
                >
                    {link.icon}
                    <Text size="xs">{link.label}</Text>
                </NavLink>
            ))}
        </Box>
    );
}
