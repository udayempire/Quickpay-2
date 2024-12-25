import express from "express";
import db from "@repo/db/client"
const app = express()


app.post("hdfcWebhook",async (req,res)=>{
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.userId
    };
    await db.balance.update({
        where:{
            userId: paymentInformation.userId,
        },
        data:{
            amount:{
                increment: paymentInformation.amount
            }
        }
    });
    await db.onRampTransaction.update({
        where:{
            token:paymentInformation.token,
        },
        data:{
            status:"Success"
        }
    });
    res.status(200).json({   
        message:"captured"
    })

})