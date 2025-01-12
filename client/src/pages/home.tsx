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
            <h1>בית</h1>
            <h2>התספורות של היום</h2>
            <ScrollArea h={300}>
                <ul>
                    {haircuts.map((haircut) => (
                        <li key={haircut._id}>
                            <p style={{ display: "inline" }}>שם:</p>
                            {haircut.name}
                            <br />
                            <br />
                            <p style={{ display: "inline" }}>סוג:</p>
                            {haircut.type === 0 ? "רגיל" : "זקן"}
                            <br />

                            <br />
                            <p style={{ display: "inline" }}>זמן:</p>
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
