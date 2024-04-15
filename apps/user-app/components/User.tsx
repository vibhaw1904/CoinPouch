"use client"
import { Button } from '@repo/ui/button';
import React from 'react'; 

export const User = ({
  user,
  key
}: {
  user: {
    id: number;
    email: string | null;
    name: string | null;
    number: string;
    password: string;
  };
  key:number
}) => {

  const handleSendMoneyClick = () => {
   
    window.location.href = '/p2p'; 
    console.log('Send money clicked! Navigating to p2p page...');
  };

  return (
    <div className='flex flex-row justify-between mt-4 w-full'>
      <div className='flex justify-between'>
        <div className='rounded-full w-12 h-12 flex justify-center mt-2 mr-2 bg-slate-200'>
          <div className='flex flex-col justify-center h-full text-xl'>
          v
          </div>
        </div>
        <div className='flex flex-col h-full justify-center'key={user.id}>
          <div>{user.name}</div>
        </div>
      </div>
  
      <div className='flex flex-row h-full justify-between'>
      {user.number}

      <Button onClick={handleSendMoneyClick} >Send money</Button>
      </div>
    </div>
  );
};
