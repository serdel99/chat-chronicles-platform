import { createClient } from '@supabase/supabase-js'

const clientId = import.meta.env.VITE_SUPABASE_TOKEN;

export const supabase = createClient('https://kfggbadwkcxukxpitngm.supabase.co', clientId)
