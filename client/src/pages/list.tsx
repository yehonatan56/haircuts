import { useEffect, useState } from "react";
import { deleteHaircut, getHaircuts, Haircut } from "../requests";
import { ScrollArea } from "@mantine/core";
import { Trash } from "tabler-icons-react";

export default function List() {
    const [haircuts, setHaircuts] = useState<Haircut[]>([]);

    useEffect(() => {
        getHaircuts().then((haircuts) => {
            setHaircuts(haircuts);
        });
    }, []);
    return (
        <div style={{ textAlign: "center" }}>
            <h1>רשימת תספורות</h1>
            <ScrollArea h={200} scrollbars="y">
                <ul>
                    {haircuts.map((haircut) => (
                        <li key={haircut._id}>
                            <p style={{ display: "inline" }}>שם:</p>
                            {haircut.name}
                            <br />
                            <p style={{ display: "inline" }}>סוג:</p>

                            {haircut.type === 0 ? "רגיל" : "זקן"}
                            <br />
                            <p style={{ display: "inline" }}>טלפון:</p>
                            {haircut.phone}
                            <br />
                            <p style={{ display: "inline" }}>תאריך:</p>

                            {haircut.date.toString()}
                            <br />
                            <Trash
                                onClick={async () => {
                                    await deleteHaircut(haircut._id as string);
                                    await getHaircuts().then((haircuts) => {
                                        setHaircuts(haircuts);
                                    });
                                }}
                                style={{
                                    cursor: "pointer",
                                    backgroundColor: "red",
                                    borderRadius: "50%",
                                    padding: "5px",
                                }}
                                color="white"
                            />
                        </li>
                    ))}
                </ul>
            </ScrollArea>
        </div>
    );
}
