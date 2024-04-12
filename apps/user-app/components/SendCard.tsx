"use client"
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { Button } from "@repo/ui/button";
import { Center } from "@repo/ui/center";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export const SendCard=()=>{
    const[amount,setAmount]=useState("");
    const [number,setNumber]=useState("");
    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label={"Number"} onChange={(value)=>{
                        setNumber(value)
                    }}/>
                    <TextInput placeholder={"Amount"} label={"Amount"} onChange={(value)=>{
                        setAmount(value)
                    }}/>
                      <div className="pt-4 flex justify-center">
                        <Button onClick={async() => {
                                await p2pTransfer(number,Number(amount)*100)
                        }}>Send</Button>
                    </div>
                    </div>
                </Card>
            </Center>
        </div>
    )
}