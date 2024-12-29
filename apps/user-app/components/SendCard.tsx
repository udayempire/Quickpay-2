"use client"
import { Center } from "@repo/ui/center"
import { Card } from "@repo/ui/card"
import { useState } from "react"
import { TextInput } from "@repo/ui/textinput"
import { Button } from "@repo/ui/button"
export const SendCard = () => {
    const [number, setNumber] = useState("")
    const [amount, setAmount] = useState("")

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
                            setNumber(value)
                        }
                    } />
                    <div className=" flex justify-center pt-4">
                        <Button onClick={() => {

                        }} >
                            Send
                        </Button>
                    </div>
                </div>



            </Card>
        </Center>
    </div>
}