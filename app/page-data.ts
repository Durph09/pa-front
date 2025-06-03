import { createClient } from "@/utils/supabase/server";


//fetch nested object of categories --> projects --tasks 
const fetchAllData = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
        console.error(error);
    }
    return data;
}