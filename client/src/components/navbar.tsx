import React from 'react';
import { Box, Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { Home, Plus, List } from 'tabler-icons-react';
import { useMediaQuery } from '@mantine/hooks';

export default function Navbar() {
    const isMobile = useMediaQuery('(max-width: 768px)'); // Adjust breakpoint as needed

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
                height: isMobile ? 60 : 80, // Adjust height for larger screens
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #eaeaea',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: isMobile ? '0' : '10px 0',
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
                        fontSize: isMobile ? '12px' : '14px', // Adjust font size
                    }}
                >
                    {React.cloneElement(link.icon, {
                        size: isMobile ? 24 : 28, // Adjust icon size for larger screens
                    })}
                    <Text size={isMobile ? 'xs' : 'sm'}>{link.label}</Text>
                </NavLink>
            ))}
        </Box>
    );
}
