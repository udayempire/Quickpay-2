import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { SendCard } from "../../../components/SendCard";
import { SentP2PTransaction,ReceivedP2PTransaction } from "../../../components/p2pTransactions";
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
async function getSentP2PTransfer(){
    const session = await getServerSession(authOptions);
    const p2pTransfer = await prisma.p2pTransfer.findMany({
        where:{
            fromUserId: Number(session?.user?.id)
        },
        include:{
            toUser:{
                select:{
                    name:true
                }
            }
        }
    })
    return p2pTransfer.map(t=>({
        amount:t.amount,
        timestamp:t.timestamp,
        to: t.toUser?.name
    }))
}
async function getReceivedtP2PTransfer(){
    const session = await getServerSession(authOptions);
    const p2pTransfer = await prisma.p2pTransfer.findMany({
        where:{
            toUserId: Number(session?.user?.id)
        },
        include:{
            fromUser:{
                select:{
                    name:true
                }
            }
        }
    })
    return p2pTransfer.map(t=>({
        amount:t.amount,
        timestamp:t.timestamp,
        from: t.fromUser?.name
    }))
}
export default async function Transfer(){
    const balance = await getBalance();
    const sentTransaction = await getSentP2PTransfer();
    const receivedTransaction = await getReceivedtP2PTransfer();
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div className="w-full">
                <SendCard/>
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked}/>
                <div className="pt-4 flex flex-col gap-4">
                    <SentP2PTransaction sentTransactions={sentTransaction}/>
                    <ReceivedP2PTransaction receivedTransactions={receivedTransaction}/>
                </div>
            </div>
        </div>
    </div>
}