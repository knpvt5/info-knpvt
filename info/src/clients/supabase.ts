
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

import { z } from 'zod';
import { userInfoSchema } from '../types';


export async function saveUserInfo(userInfoData: z.infer<typeof userInfoSchema>) {

    if (Object.keys(userInfoData).length === 0) {
        console.error("User info data is empty. Aborting save operation.");
        return;
    }

    const { data, error } = await supabase
        .from('user_info')
        .insert([userInfoData]);

    console.log(data)

    if (error) {
        console.error('Error inserting data:', error);
    } else {
        console.log('Data inserted:', data);
    }
}


// Fetch and validate existing data (call this from a component when needed)
export async function fetchUserInfo() {
    const { data, error } = await supabase.from("user_info").select("*");

    if (error) {
        console.error("Error fetching data:", error);
        throw error;
    }

    const parsedData = userInfoSchema.array().safeParse(data);

    if (!parsedData.success) {
        console.error("Data validation failed:", parsedData.error);
        throw new Error("Invalid data format");
    }

    console.log("Parsed data:", parsedData.data);
    return parsedData.data;
}

fetchUserInfo()


// Export function to call Edge Function (instead of top-level call)
export async function callNodeApi() {
    // const apiName = "node-api";
    const apiName = "get-ipaddress";
    // const apiName = "hyper-responder";
    // const apiName = "get-region";
    const { data, error } = await supabase.functions.invoke(apiName);

    if (error) {
        console.error("Error invoking edge function:", error);
        throw error;
    }

    console.log("Edge function response:", data);
    return data;
}

callNodeApi().then(response => {
    console.log("Response from Edge Function:", response);
}).catch(error => {
    console.error("Error calling Edge Function:", error);
});