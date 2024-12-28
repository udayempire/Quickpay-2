import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { AddMoneyCard } from "../../../components/AddMoneyCard";


async function getBalance(){
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where:{
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance.amount || 0,
        locked: balance.locked || 0
    }
}

async function getOnRampTransaction(){
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where:{
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t=>({
        time: t.startTime,
        amount: t.amount,
        status:t.status,
        provider:t.provider
    }))
    // return {
    //     time: txns.time,
    //     amount: txns.amount,
    //     status: txns.status,
    //     provider: txns.provider

    // }
}


export default async function Transfer(){
    const balance = await getBalance();
    const onRampTransaction = await getOnRampTransaction();
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            transfer
        </div>
        <div>
            <div>
                <AddMoneyCard/>
            </div>
        </div>
    </div>
}