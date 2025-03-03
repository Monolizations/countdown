import { createClient } from "@supabase/supabase-js"

// These will be loaded from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface LastMessage {
  id: string
  created_at: string
  name: string
  message: string
}

export async function saveLastMessage(name: string, message: string) {
  const { data, error } = await supabase.from("last_messages").insert([{ name, message }]).select()

  if (error) {
    console.error("Error saving message:", error)
    throw error
  }

  return data
}

export async function getLastMessages(limit = 10) {
  const { data, error } = await supabase
    .from("last_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching messages:", error)
    throw error
  }

  return data as LastMessage[]
}

