"use client";

import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import React from 'react';
import { motion } from 'framer-motion';

interface UserProps {
  user: {
    id: number;
    email: string | null;
    name: string | null;
    number: string;
    password: string;
  }[];
}

export const User: React.FC<UserProps> = ({ user }) => {
 

  return (
    <Card title="">
      <motion.h2 
        className="text-2xl font-bold mb-4 p-4 bg-purple-600 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Available Users
      </motion.h2>
      <div className="p-4">
        {user.map((u, index) => (
          <motion.div 
            key={u.id} 
            className='flex flex-col sm:flex-row justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className='flex items-center mb-2 sm:mb-0'>
              <motion.div 
                className='rounded-full w-12 h-12 flex justify-center items-center bg-purple-200 text-purple-700 font-bold text-xl mr-4'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {u.name ? u.name[0].toUpperCase() : 'U'}
              </motion.div>
              <div className='flex flex-col'>
                <div className="font-semibold text-lg">{u.name}</div>
                <div className="text-sm text-gray-600">{u.number}</div>
              </div>
            </div>
            <motion.div 
              className='mt-2 sm:mt-0'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};