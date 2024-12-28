"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/select"
import { TextInput } from "@repo/ui/textinput"
import { useState } from "react"
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTxns"
const SUPPORTED_BANK = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
},{
    name: "State Bank Of India",
    redirectUrl: "https://retail.onlinesbi.sbi/retail/login.htm"
}
]
export const AddMoneyCard = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANK[0]?.redirectUrl)
    const [amount,setAmount]= useState(0)
    const [provider, setProvider] = useState(SUPPORTED_BANK[0]?.name || "")
    return <Card title="Add Money">
        <div className="">
            <TextInput label="Amount" placeholder="Enter the Amount" onChange={(value) => {
                setAmount(value)
            }} />
            <div>
                Bank
            </div>
            <Select onSelect={(value) => {
                setRedirectUrl(SUPPORTED_BANK.find(x => x.name === value)?.redirectUrl || "")
                setProvider(SUPPORTED_BANK.find(x=> x.name === value)?.name || "")
            }} options={SUPPORTED_BANK.map(x => ({
                key: x.name,
                value: x.name
            }))}/>
            <div className="flex justify-center pt-4">
                <Button onClick={async () => {
                    await createOnRampTransaction({amount: amount*100 , provider: provider})
                    window.location.href = redirectUrl || "";
                }}>
                    Add Money
                </Button>
            </div>
        </div>
    </Card >
}