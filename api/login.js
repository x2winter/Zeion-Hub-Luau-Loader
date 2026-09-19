const{cors,createToken}=require("./_supabase");
module.exports=async(req,res)=>{
 cors(res);
 if(req.method==="OPTIONS")return res.status(204).end();
 if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
 try{
  const password=String(req.body?.password||"");
  if(!password)return res.status(400).json({error:"Access Code is required"});
  if(password!==process.env.PANEL_PASSWORD)return res.status(401).json({error:"Invalid Access Code"});
  return res.status(200).json({status:"success",token:createToken()});
 }catch(e){return res.status(500).json({error:e.message})}
};