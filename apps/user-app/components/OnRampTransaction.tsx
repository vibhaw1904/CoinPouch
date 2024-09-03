
"use client"
import React from 'react';
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
  if (!transactions.length) {
    return (
      <Card title='Transaction list'>
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
    <Card title="Recent Transactions">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-4 p-4 bg-purple-600 text-white rounded-t-lg"
      >
        Recent Transactions
      </motion.h2>
      <div className="p-4">
        {transactions.map((t, index) => (
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
    </div>
      
    </Card>
  );
};