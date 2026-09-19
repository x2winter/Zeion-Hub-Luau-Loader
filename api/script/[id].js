const{cors,supabase}=require("../_supabase");
module.exports=async(req,res)=>{
 cors(res);
 if(req.method!=="GET")return res.status(405).send("Method not allowed");
 try{
  const id=String(req.query.id||"").trim();
  if(!id)return res.status(400).send("Missing script ID");
  const data=await supabase(`zeion_api?id=eq.${encodeURIComponent(id)}&select=code&limit=1`,{method:"GET"});
  if(!Array.isArray(data)||!data.length)return res.status(404).send("Script not found");
  res.setHeader("Content-Type","text/plain; charset=utf-8");
  res.setHeader("Cache-Control","no-store");
  return res.status(200).send(data[0].code);
 }catch{return res.status(500).send("Server error")}
};
