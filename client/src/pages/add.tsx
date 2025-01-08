import { useState } from "react";
import { addHaircut, Haircut } from "../requests";

type statuses = "waiting for submission" | "submitted successfully" | "date is invalid" | "phone number is invalid";
export default function Add() {
    const [haircut, setHaircut] = useState<Haircut>({
        name: "",
        price: 0,
        type: "",
        phone: "",
        date: new Date(),
    });

    const [status, setStatus] = useState<statuses>("waiting for submission");

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Add Customer</h1>
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
                        price: 0,
                        type: "",
                        phone: "",
                        date: new Date(),
                    });
                }}
            >
                <input
                    type="text"
                    placeholder="Name"
                    value={haircut.name}
                    onChange={(e) => setHaircut({ ...haircut, name: e.target.value })}
                    required
                />
                <br />
                <input
                    type="number"
                    placeholder="Price"
                    value={haircut.price}
                    onChange={(e) => setHaircut({ ...haircut, price: parseInt(e.target.value) })}
                    required
                />
                <br />

                <input
                    type="text"
                    placeholder="Type"
                    value={haircut.type}
                    onChange={(e) => setHaircut({ ...haircut, type: e.target.value })}
                    required
                />
                <br />

                <input
                    type="text"
                    placeholder="Phone"
                    value={haircut.phone}
                    onChange={(e) => setHaircut({ ...haircut, phone: e.target.value })}
                    required
                />
                <br />

                <input
                    type="datetime-local"
                    placeholder="Date"
                    onChange={(e) => setHaircut({ ...haircut, date: new Date(e.target.value) })}
                    required
                />
                <br />

                <button type="submit">Add Customer</button>

                <p>{status}</p>
            </form>
        </div>
    );
}
