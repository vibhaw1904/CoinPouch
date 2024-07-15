import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { User } from "../../../components/User";
import { Card } from "@repo/ui/card";
import { UserGraph } from "../../../components/UserGraph";

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
  const loggedInUserId = session?.user?.id;
  const otherUsers = users.filter((user) => user.id !== loggedInUserId);
  console.log(otherUsers);
  return (
    <div className="m-[3%]">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">Dashboard</div>
      <UserGraph transaction={transactions.reverse()} />
      <div className="flex justify-center items-center w-full">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-8 p-4">
          <div className="lg:col-span-3">
            <User user={otherUsers} />
          </div>
          {/* <div className="lg:col-span-5">
            <P2PTransaction transactions={transactions}></P2PTransaction>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
