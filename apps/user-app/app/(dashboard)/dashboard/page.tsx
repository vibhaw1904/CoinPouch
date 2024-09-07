import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { UserGraph } from "../../../components/UserGraph";
import { OnRampTransactions } from "../../../components/OnRampTransaction";

interface Transaction {
  amount: number;
  timestamp: Date;
  fromUserId: number;
  toUserId: number;
  currentUser: number;
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

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
      where: {
          OR: [
              { fromUserId: Number(session?.user?.id) },
              { toUserId: Number(session?.user?.id) }
          ],
      },
  });
  return txns.map(t => ({
      time: t.timestamp,
      amount: t.amount,
      transactionType: t.fromUserId == session?.user?.id ? 'Sent' : 'Received',
  }));
}
export default async function DashboardPage() {
  const transactions = await getTransaction();
  const allTransactions = await getOnRampTransactions();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-purple-700 font-bold mb-8">Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Transaction Overview</h2>
        <UserGraph transaction={transactions.reverse()} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <OnRampTransactions transactions={allTransactions}/>
          </div>
        </div>
      </div>
    </div>
  );
}