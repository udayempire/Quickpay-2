"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import  prisma  from "@repo/db/client"
 
export async function p2pTransfer({to,amount}:{
    to:string,
    amount:number
}){
    const session = await getServerSession(authOptions)
    const from = session?.user?.id;
    if(!from){
        return {
            message:" You are not logged in!"
        }
    }
    const toUser = await prisma.user.findFirst({
        where:{
            number:to
        }
    });
    if(!toUser){
        return{
            message:"User Doesnt Exist"
        }
    }
    await prisma.$transaction(async(tx)=>{
        const fromBalance = await tx.balance.findUnique({
            where:{
                userId: Number(from)
            }
        });
        if(!fromBalance || fromBalance.amount< amount){
            return {
                message: "Insufficient Funds"
            }
        }
        try{
            await tx.balance.update({
                where:{
                    userId:from
                },
                data:{
                    amount:{
                        decrement: amount
                    }
                }
            });
            await tx.balance.update({
                where:{
                    userId : toUser.id
                },
                data:{
                    amount:{
                        increment: amount
                    }
                }
            });
            return{
                message:`Transaction was succesfull`
            }

        }catch(error){
            console.error(error)
            return{
                message:`Transaction Failed Please Try Again Later`
            }
        }  
    });
}