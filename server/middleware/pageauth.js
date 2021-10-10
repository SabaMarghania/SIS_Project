const authPage = (perms) =>{

    return (req,res,next)=>{

        const userRole = req.body.role;

        if(perms.includes(userRole)){
            next();
        }else{
            return res.status(401).json("You don't have permisions!")
        }
    }
}
module.exports = authPage