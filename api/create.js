const{cors,supabase,verifyToken}=require("./_supabase");
function code8(){return String(Math.floor(10000000+Math.random()*90000000))}
module.exports=async(req,res)=>{
 cors(res);
 if(req.method==="OPTIONS")return res.status(204).end();
 if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
 try{
  const a=req.headers.authorization||"";
  if(!a.startsWith("Bearer ")||!verifyToken(a.slice(7)))return res.status(401).json({error:"Unauthorized"});
  const name=String(req.body?.name||"").trim();
  const code=String(req.body?.code||"");
  if(!name)return res.status(400).json({error:"Script Name / ID is required"});
  if(!/^[A-Za-z0-9_-]{1,80}$/.test(name))return res.status(400).json({error:"Script Name / ID can only contain A-Z, a-z, 0-9, _ and -"});
  if(!code.trim())return res.status(400).json({error:"Script code is required"});
  const old=await supabase(`zeion_api?id=eq.${encodeURIComponent(name)}&select=id`,{method:"GET"});
  if(Array.isArray(old)&&old.length)return res.status(409).json({error:"Script Name / ID already exists"});
  const randomCode=code8();
  const base=(process.env.PUBLIC_BASE_URL||`https://${req.headers.host}`).replace(/\/$/,"");
  const url=`${base}/api/script/${encodeURIComponent(name)}`;
  const loader=`loadstring(game:HttpGet("${url}", true))(${randomCode})`;
  await supabase("zeion_api",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({id:name,name,code,loader_code:randomCode,created_at:Date.now()})});
  return res.status(200).json({status:"success",id:name,name,randomCode,rawUrl:url,loadstring:loader});
 }catch(e){return res.status(500).json({error:e.message})}
};