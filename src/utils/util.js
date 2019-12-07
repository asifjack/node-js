let bcrypt =require('bcrypt');
exports.getHash=async function(password)
{
     let hash=await bcrypt.hash(password,8);
     return hash;
}


exports.checkHash = async function(password,hashBassword)
{
   let check=await bcrypt.compare(password, hashBassword);
   return check;
}