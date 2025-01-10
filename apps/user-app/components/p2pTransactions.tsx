import { Card } from "@repo/ui/card"
export const SentP2PTransaction=({sentTransactions}:{
    sentTransactions:{
        to:string | null,
        amount:number,
        timestamp: Date
    }[]
    
})=>{
    if(!sentTransactions || sentTransactions.length===0){
        return <Card title="Sent Transaction">
            <div  className="text-center pb-8 pt-8">
                No Recent Transaction
            </div>
        </Card>
    }
    return <Card title="Sent Transaction">
        <div className="flex flex-col gap-2">
            {sentTransactions.map((t,index)=> 
                <div key={index} className="flex justify-between border-b pb-1">
                    <div>
                        <div className="text-sm">
                            Paid to {t.to}
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.timestamp.toDateString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center text-red-700">
                        - Rs {t.amount / 100}
                    </div>
                </div>)}
        </div>
    </Card>
}
export const ReceivedP2PTransaction=({receivedTransactions}:{
    receivedTransactions:{
        from:string | null,
        amount:number,
        timestamp: Date
    }[]
    
})=>{
    if(!receivedTransactions || receivedTransactions.length===0){
        return <Card title="Received Transaction">
            <div  className="text-center pb-8 pt-8">
                No Recent Transaction
            </div>
        </Card>
    }
    return <Card title="Received Transaction">
        <div className="flex flex-col gap-2 ">
            {receivedTransactions.map((t,index)=> 
                <div key={index} className="flex justify-between border-b pb-1 ">
                    <div className="">
                        <div className="text-sm">
                            Received from {t.from}
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.timestamp.toDateString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center text-green-600">
                        + Rs {t.amount / 100}
                    </div>
                </div>)}
        </div>
    </Card>
}