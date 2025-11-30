import { supabase } from "../supabase";

export async function fetchProducts(category: string) {
    try{
        const {data, error} = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .order("id", { ascending: true });

        if (error) {
            console.error("Fetch products error: ", error);
            return[];
        }
        return data;
    } catch (err) {
        console.error("Fetch products failed: ", err);
        return [];
    }
}