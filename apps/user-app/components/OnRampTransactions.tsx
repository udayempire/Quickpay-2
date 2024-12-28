import { Card } from "@repo/ui/card"
export const OnRampTransaction=({transactions}:{
    transactions:{
        time: Date,
        amount: number,
        status:"Success" | "Failure" | "Pending" //make status type more specific
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
        <div>
            {transactions.map((t,index)=> 
                <div key={index} className="flex justify-between">
                    <div>
                        <div className="text-sm">
                            Recived INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        + Rs {t.amount / 100}
                    </div>
                </div>)}
        </div>
    </Card>
}