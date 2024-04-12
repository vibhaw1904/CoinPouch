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
  return (
    <div className='flex flex-row justify-between mt-4'>
      <div className='flex'>
        <div className='rounded-full w-12 h-12 flex justify-center mt-2 mr-2 bg-slate-200'>
          <div className='flex flex-col justify-center h-full text-xl'>
          v
          </div>
        </div>
        <div className='flex flex-col h-full justify-center'key={user.id}>
          <div>{user.name}</div>
        </div>
      </div>
      <div className='flex flex-row h-full justify-center'>
       {user.number}
      </div>
    </div>
  );
};
