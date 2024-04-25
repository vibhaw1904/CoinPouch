"use client"

import { Card } from "@repo/ui/card"
import { useEffect, useState } from "react"
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
interface transactions{
    amount:number,
    timestamp:Date,
    fromUserId:number,
    toUserId:number,
    currentUser:number

}
export const UserGraph=({transaction}:{transaction:transactions[]})=>{
    const[userAmount,setUserAmount]=useState<any>([]);
    useEffect(()=>{
        const data=transaction.map((u)=>{
            if(u.currentUser===u.fromUserId){
                return({
                    timestamp:u.timestamp,
                    amount:-u.amount/100
                })
            }
            else{
                return ({
                    timestamp:u.timestamp,
                    amount:u.amount/100
                })
            }
        }).reverse();
        console.log(data)

        setUserAmount(data);
    },[]);


return(
<Card title="Transaction graph">
<div className="w-full h-96">
        <LineChart  width={900}
        height={400}
        data={userAmount}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
       <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
        
    </div>
</Card>
   
)

}