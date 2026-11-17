export const roleMiddleware=(...allowedRoles)=>{
    
    return (req,resp,next)=>{
        const user=req.user;
        if(!allowedRoles.includes(user.role)){
            return resp.status(401).json({
                message:"Access Denied",
                success:false
            })
        }
        next();
    }
}