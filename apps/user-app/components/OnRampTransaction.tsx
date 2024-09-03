
"use client"
import React, { useState } from 'react';
import { Card } from "@repo/ui/card";
import { motion } from 'framer-motion';

interface Transaction {
  time: Date;
  amount: number;
  transactionType: string;
}

interface OnRampTransactionsProps {
  transactions: Transaction[];
}

export const OnRampTransactions: React.FC<OnRampTransactionsProps> = ({ transactions }) => {
  const sortedTransactions = transactions.sort((a, b) => b.time.getTime() - a.time.getTime());
  const[currentPage,setCurrentPage]=useState(1);
  const pageSize=5;
  const totalPages=Math.ceil(transactions.length/pageSize);
  const startIndex=(currentPage-1)*pageSize;
  const endIndex=startIndex+pageSize;
  const currentTransactions=sortedTransactions.slice(startIndex,endIndex);

  if (!sortedTransactions.length) {
    return (
      <Card title=''>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12 text-gray-500"
        >
          No recent transactions
        </motion.div>
      </Card>
    );
  }

  return (
    <Card title="">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-4 p-4 bg-purple-600 text-white rounded-t-lg"
      >
        Recent Transactions
      </motion.h2>
      <div className="p-4">
        {currentTransactions.map((t, index) => (
          <motion.div
            key={t.time.toString()}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex justify-between items-center py-4 border-b last:border-b-0"
          >
            <div>
              <motion.div 
                className={`text-sm font-medium ${t.transactionType === "Sent" ? "text-red-600" : "text-green-600"}`}
                whileHover={{ scale: 1.05 }}
              >
                {t.transactionType === "Sent" ? "Sent INR" : "Received INR"}
              </motion.div>
              <div className="text-gray-500 text-xs mt-1">
                {t.time.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
            <motion.div 
              className={`text-lg font-bold ${t.transactionType === "Sent" ? "text-red-600" : "text-green-600"}`}
              whileHover={{ scale: 1.1 }}
            >
              {t.transactionType === "Sent" ? "- " : "+ "}
              ₹{(t.amount / 100).toFixed(2)}
            </motion.div>
          </motion.div>
        ))}
        <div className="flex justify-between items-center mt-4 px-4">
        <button
        onClick={()=>setCurrentPage(prev=>Math.max(prev-1,1))}
         disabled={currentPage === 1}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
        </div>
    </div>
      
    </Card>
  );
};