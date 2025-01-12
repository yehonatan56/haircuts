const serverUrl = "http://localhost:3000";

export interface Haircut {
    _id?: string;
    name: string;
    type: number;
    phone: string;
    date: Date;
}
export const getHaircuts = async (): Promise<Haircut[]> => {
    const response = await fetch(`${serverUrl}/`);
    return response.json();
};

export const getTodayHaircuts = async (): Promise<Haircut[]> => {
    const response = await fetch(`${serverUrl}/today`);
    return response.json();
};

export const addHaircut = async (haircut: Haircut): Promise<Haircut> => {
    const response = await fetch(`${serverUrl}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(haircut),
    });
    return response.json();
};

export const deleteHaircut = async (id: string): Promise<void> => {
    await fetch(`${serverUrl}/${id}`, {
        method: "DELETE",
    });
};
