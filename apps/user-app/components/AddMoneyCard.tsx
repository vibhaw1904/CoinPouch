"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/center"
import { Select } from "@repo/ui/select"
import {TextInput} from "@repo/ui/textinput"
import { useState } from "react"
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransacton"

const SUPPORTED_BANKS=[{
    name:"HDFC Bank",
    redirectUrl:"https://netbanking.hdfcbank.com"
},{
    name:"Axis Bank",
    redirectUrl:"https://www.axisbank.com/"
}]

export const AddMoney=()=>{
    const[redirectUrl,setRedirectUrl]=useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const[provider,setProvider]=useState(SUPPORTED_BANKS[0]?.name ||"");
    const[amount,setAmount]=useState(0);
    return <Card title="Add Money">
        <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"}   onChange={(value)=>{
            setAmount(value) 
        }}/>
        <div className="py-4 text-left">
        Bank
        </div>
        <Select onSelect={(value)=>{
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name===value)?.redirectUrl||"")
            setProvider(SUPPORTED_BANKS.find(x => x.name===value)?.name||"")
        }}
        options={SUPPORTED_BANKS.map(x=>({
            key:x.name,
            value:x.name
        }))}
        />
        <div className="flex justify-center pt-4">
        <Button onClick={async()=>{
        
            await createOnRampTransaction(provider,amount*100)
            window.location.href=redirectUrl ||"";
        }}>
            Add money
        </Button>
        </div>
        </div>

    </Card>
}