import { Card } from "@repo/ui/card"
export const OnRampTransaction=({transactions}:{
    transactions:{
        time: Date,
        amount: number,
        status:"Success" | "Failure" | "Processing" //make status type more specific
        provider:string
    }[]
})=>{
    if(!transactions || transactions.length===0){
        return <Card title="Recent Transaction">
            <div  className="text-center pb-8 pt-8">
                No Recent Transaction
            </div>
        </Card>
    }
    return <Card title="Recent Transaction">
        <div className="flex flex-col gap-2">
            {transactions.map((t,index)=> 
                <div key={index} className="flex justify-between border-b py-1">
                    <div>
                        <div className="text-sm">
                            Received  from {t.provider}
                        </div>
                        <div className="text-slate-600 text-xs flex gap-5">
                            <p>{t.time.toDateString()}</p>
                            <p>{t.status}</p>
                            
                        </div>
                    </div>
                    <div className="flex flex-col justify-center text-green-600">
                        + Rs {t.amount / 100}
                    </div>
                </div>)}
        </div>
    </Card>
}