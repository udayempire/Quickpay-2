"use server"
import { getServerSession }  from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"

export async function createOnRampTransaction({amount,provider}:{
    amount:number,
    provider:string
}){

    const session = await getServerSession(authOptions)
    const token = Math.random().toString(); //token should come from bank but since we dont have it we are using of our own
    const userId = session?.user?.id
    if(!userId){
        return {
            message:"User not logged in"
        }
    }
    await prisma.onRampTransaction.create({
        data:{
            userId: Number(userId),
            amount:amount,
            status:"Processing",
            startTime: new Date(),
            provider,
            token
        }
    })

}