const crypto=require("crypto");
const SUPABASE_URL=process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY=process.env.SUPABASE_SECRET_KEY;
async function supabase(path,options={}){
 const r=await fetch(`${SUPABASE_URL}/rest/v1/${path}`,{...options,headers:{apikey:SUPABASE_SECRET_KEY,Authorization:`Bearer ${SUPABASE_SECRET_KEY}`,"Content-Type":"application/json",...(options.headers||{})}});
 const t=await r.text();
 if(!r.ok)throw new Error(`HTTP ${r.status}: ${t}`);
 return t?JSON.parse(t):null;
}
function cors(res){
 res.setHeader("Access-Control-Allow-Origin","*");
 res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization");
 res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS");
}
function createToken(){
 const secret=process.env.PANEL_SESSION_SECRET||process.env.PANEL_PASSWORD;
 const ts=Date.now().toString();
 const sig=crypto.createHmac("sha256",secret).update(ts).digest("hex");
 return `${ts}.${sig}`;
}
function verifyToken(token){
 try{
  const secret=process.env.PANEL_SESSION_SECRET||process.env.PANEL_PASSWORD;
  const [ts,sig]=String(token||"").split(".");
  const age=Date.now()-Number(ts);
  if(!ts||!sig||!Number.isFinite(age)||age<0||age>86400000)return false;
  const expected=crypto.createHmac("sha256",secret).update(ts).digest("hex");
  return sig.length===expected.length&&crypto.timingSafeEqual(Buffer.from(sig),Buffer.from(expected));
 }catch{return false}
}
module.exports={supabase,cors,createToken,verifyToken};