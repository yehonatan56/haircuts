import { useState } from "react";
import { addHaircut, Haircut } from "../requests";

type statuses = "waiting for submission" | "submitted successfully" | "date is invalid" | "phone number is invalid";
export default function Add() {
    const [haircut, setHaircut] = useState<Haircut>({
        name: "",
        type: 0,
        phone: "",
        date: new Date(),
    });

    const [status, setStatus] = useState<statuses>("waiting for submission");

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
            }}
        >
            <h1>הוספת תור</h1>
            <form
                style={{
                    lineHeight: "20px",
                    border: "1px solid black",
                    padding: "10px",
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "column",
                    width: "200px",
                    margin: "auto",
                    marginTop: "200px",
                    transform: "scale(1.5)",
                }}
                onSubmit={async (e) => {
                    e.preventDefault();
                    if (haircut.date.getTime() < new Date().getTime()) {
                        setStatus("date is invalid");
                        return;
                    }

                    if (!haircut.phone.match(/^\d{10}$/)) {
                        setStatus("phone number is invalid");
                        return;
                    }

                    setStatus("submitted successfully");
                    await addHaircut(haircut);
                    setHaircut({
                        name: "",
                        type: 0,
                        phone: "",
                        date: new Date(),
                    });
                }}
            >
                <input
                    type="text"
                    placeholder="שם"
                    value={haircut.name}
                    onChange={(e) => setHaircut({ ...haircut, name: e.target.value })}
                    required
                />
                <br />

                <label>סוג:</label>

                <select
                    value={haircut.type}
                    onChange={(e) => setHaircut({ ...haircut, type: +e.target.value })}
                    required
                >
                    <option value="0">רגיל</option>
                    <option value="1">זקן</option>
                </select>
                <br />

                <input
                    type="text"
                    placeholder="טלפון"
                    value={haircut.phone}
                    onChange={(e) => setHaircut({ ...haircut, phone: e.target.value })}
                    required
                />
                <br />

                <input
                    type="datetime-local"
                    placeholder="זמן"
                    onChange={(e) => setHaircut({ ...haircut, date: new Date(e.target.value) })}
                    required
                />
                <br />

                <button type="submit">הוספת תור</button>

                <p>{status}</p>
            </form>
        </div>
    );
}
