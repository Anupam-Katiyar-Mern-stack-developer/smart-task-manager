import { dashboardService } from "../../services/tasks.service.js";

export const dashboardController=async(req ,res ,next )=>{
    try {

        const {userId}=req.user;

        if(!userId){
            return res.status(401).json({
                success:false,
                message:"Token expired"
            });
        }

        const  result =await dashboardService({userId});
        console.log(result)
        return res.status(200).json({
            success:true,
            message:"Dashborad succesfully fetch",
            data:result
        })
        
    } catch (error) {
        next (error);
        
    }
}