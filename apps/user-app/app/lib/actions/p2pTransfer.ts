"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import  prisma  from "@repo/db/client"
 
export async function p2pTransfer({to,amount}:{
    to:string,
    amount:number
}){
    if (!to || !amount) {
        return { message: "Invalid payload. Please provide both 'to' and 'amount'." };
    }
    const session = await getServerSession(authOptions)
    const fromUser = session?.user?.id;
    console.log(fromUser)
    if(!fromUser){
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
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUser)} FOR UPDATE`; //now two transaction cannot happen at same time by locking the route. In Mongodb its usually not happen as two req cant happen in same time 
        const fromBalance = await tx.balance.findUnique({
            where:{
                userId: Number(fromUser)
            },
        });
        if(!fromBalance || fromBalance.amount< amount){
            throw new Error("Insufficient funds.");
        }
        try{
            await tx.balance.update({
                where:{
                    userId:Number(fromUser)
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
            console.log(Number(toUser.id))

            await prisma.p2pTransfer.create({
                data:{
                    toUserId: Number(toUser.id),
                    fromUserId: Number(fromUser),
                    amount: amount,
                    timestamp: new Date(),
                }
            })
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

