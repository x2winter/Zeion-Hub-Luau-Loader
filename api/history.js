const{cors,supabase,verifyToken}=require("./_supabase");
module.exports=async(req,res)=>{
 cors(res);
 if(req.method==="OPTIONS")return res.status(204).end();
 if(req.method!=="GET")return res.status(405).json({error:"Method not allowed"});
 try{
  const a=req.headers.authorization||"";
  if(!a.startsWith("Bearer ")||!verifyToken(a.slice(7)))return res.status(401).json({error:"Unauthorized"});
  const data=await supabase("zeion_api?select=id,name,loader_code,created_at&order=created_at.desc&limit=100",{method:"GET"});
  return res.status(200).json(data||[]);
 }catch(e){return res.status(500).json({error:e.message})}
};