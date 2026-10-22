import pool from "../config/db";

export const userRegisterService =async({
    name,
    email,
    password,
})=>{
    try{
        const normalizedEmail = email.trim();
        if(!name || !email || !password){
            const error =  new Error("all fields are require");
            error.statusCode = 400;
            throw error;

        }

        const emailCheck = await pool.query(`
            select id, email from users 
            where email = $1
            `,[normalizedEmail]
            )

        if(emailCheck.rows.length>0){
            const error = new Error("email already register")
        }
        
        const response = await pool.query(
            "insert into users (name,email)"
        )
    }catch(error){
        
    }
}