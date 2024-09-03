"use client"
import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4 border-slate-300 ">
        <div className="text-3xl flex flex-col justify-center font-bold text-purple-700 ">
            CoinPouch
        </div>
        
        <div className="flex flex-row justify-center pt-2">
        <div className='flex flex-col justify-center mr-4 h-full'>Hello, {user?.name}</div>
       
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}