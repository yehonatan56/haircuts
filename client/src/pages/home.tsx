import { useEffect, useState } from "react";
import { getTodayHaircuts, Haircut } from "../requests";
import { ScrollArea } from "@mantine/core";

export default function Home() {
    const [haircuts, setHaircuts] = useState<Haircut[]>([]);

    useEffect(() => {
        getTodayHaircuts().then((haircuts) => {
            setHaircuts(haircuts);
        });
    }, []);
    return (
        <div>
            <h1>Home</h1>
            <h2>Today's Haircuts</h2>
            <ScrollArea h={300}>
                <ul>
                    {haircuts.map((haircut) => (
                        <li key={haircut._id}>
                            <p style={{ display: "inline" }}>Name:</p>
                            {haircut.name}
                            <br />
                            <br />
                            <p style={{ display: "inline" }}>Type:</p>
                            {haircut.type}
                            <br />

                            <br />
                            <p style={{ display: "inline" }}>Time:</p>
                            {new Date(haircut.date).getHours().toString() +
                                ":" +
                                new Date(haircut.date).getMinutes().toString()}
                        </li>
                    ))}
                </ul>
            </ScrollArea>
        </div>
    );
}
