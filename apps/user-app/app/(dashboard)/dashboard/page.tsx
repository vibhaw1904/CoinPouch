
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { User } from "../../../components/User";
import { Card } from "@repo/ui/card";
import { UserGraph } from "../../../components/UserGraph";
import { motion } from "framer-motion";
import { getOnRampTransactions } from "../transfer/page";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
interface Transaction {
  amount: number;
  timestamp: Date;
  fromUserId: number;
  toUserId: number;
  currentUser: number;
}

interface User {
  id: number;
  name: string | null;
  email: string | null;
  number: string;
  password: string;  // Add other fields as necessary
}

async function getAllUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}



async function getTransaction(): Promise<Transaction[]> {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: Number(session?.user?.id) },
        { toUserId: Number(session?.user?.id) }
      ]
    }
  });
  return transactions.map(u => ({
    amount: u.amount,
    timestamp: u.timestamp,
    fromUserId: u.fromUserId,
    toUserId: u.toUserId,
    currentUser: Number(session?.user?.id)
  }));
}

const DashboardPage = async () => {
  const users = await getAllUsers();
  const session = await getServerSession(authOptions);
  const transactions = await getTransaction();
  const loggedInUserId = Number(session?.user?.id);
  const otherUsers = users.filter((user) => user.id !== loggedInUserId);
  const allTransactions=await getOnRampTransactions()
  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl text-purple-700 font-bold mb-8">Dashboard</h1>
    
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Transaction Overview</h2>
      <UserGraph transaction={transactions.reverse()} />
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md h-full">
          <User user={otherUsers} />
        </div>
      </div>
      
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6 h-full">
          {/* <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2> */}
         
          <OnRampTransactions transactions={allTransactions}/>
        </div>
      </div>
    </div>
  </div>

  );
};

export default DashboardPage;
