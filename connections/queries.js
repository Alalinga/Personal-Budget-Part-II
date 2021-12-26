import pool from "./config";


const getAllEnvelopes=(req,res)=>{
    pool.query('SELECT * FROM envelopes',(error,results)=>{
       if(error){
        throw error
       }else{
           res.status(200).json(results.rows)
       }
    });
}
