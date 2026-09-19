# Zeion Script Panel

Access Code is separate from script upload.

Set the Vercel environment variable:

PANEL_PASSWORD=(?!#@o2w67q3457]*

Other variables:
SUPABASE_URL
SUPABASE_SECRET_KEY
PANEL_SESSION_SECRET
PUBLIC_BASE_URL

The panel uses the Supabase table `zeion_api`.

Script Name / ID is manually entered, for example:
BloxFruits

The system generates a separate 8-digit code, for example:
58310427

Loader:
loadstring(game:HttpGet("https://your-domain.com/api/script/BloxFruits", true))(58310427)

No obfuscation is performed by this panel.
Do not put SUPABASE_SECRET_KEY in frontend code.
