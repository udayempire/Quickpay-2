"use client"
import { Center } from "@repo/ui/center"
import { Card } from "@repo/ui/card"
import { useState } from "react"
import { TextInput } from "@repo/ui/textinput"
import { Button } from "@repo/ui/button"
import { p2pTransfer } from "../app/lib/actions/p2pTransfer"
export const SendCard = () => {
    const [number, setNumber] = useState("")
    const [amount, setAmount] = useState(0)

    return <div className="h-[90vh]">
        <Center>
            <Card title="Send Money">
                <div className="min-w-72 pt-2 ">
                    <TextInput label="Phone Number" placeholder="Enter Your Phone Number" onChange={
                        (value) => {
                            setNumber(value)
                        }
                    } />
                    <TextInput label="Amount" placeholder="Enter Your Amount" onChange={
                        (value) => {
                            setAmount(value)
                        }
                    } />
                    <div className=" flex justify-center pt-4">
                        <Button onClick={async() => {
                            console.log(number,amount)
                            await p2pTransfer({to:number ,amount:Number(amount)*100})
                        }} >
                            Send
                        </Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}