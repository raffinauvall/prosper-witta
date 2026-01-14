export type AdminMe = {
    id: string;
    name: string;
};

export async function getAdminMe(): Promise<AdminMe> {
    const res = await fetch("api/admin/me",{
        credentials: "include",
    });

    if(!res.ok) {
        throw new Error("Failed to fetch admin info")
    }
    return res.json();
}