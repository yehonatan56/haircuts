import { useEffect, useState } from 'react';
import { getHaircuts, Haircut } from '../requests';
import { ScrollArea } from '@mantine/core';

export default function List() {
    const [haircuts, setHaircuts] = useState<Haircut[]>([]);

    useEffect(() => {
        getHaircuts().then((haircuts) => {
            setHaircuts(haircuts);
        });
    }, []);
    return (
        <div>
            <h1>List of Haircuts</h1>
            <ScrollArea h={300}>
                <ul>
                    {haircuts.map((haircut) => (
                        <li key={haircut._id}>
                            <p style={{ display: 'inline' }}>Name:</p>
                            {haircut.name}
                            <br />

                            <p style={{ display: 'inline' }}>Price:</p>
                            {haircut.price}
                            <br />

                            <p style={{ display: 'inline' }}>Type:</p>

                            {haircut.type}
                            <br />
                            <p style={{ display: 'inline' }}>Phone:</p>
                            {haircut.phone}
                            <br />

                            <p style={{ display: 'inline' }}>Date:</p>

                            {haircut.date.toString()}
                        </li>
                    ))}
                </ul>
            </ScrollArea>
        </div>
    );
}
