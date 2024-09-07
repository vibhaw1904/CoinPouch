import { getServerSession } from "next-auth";
import { OnRampTransactions } from "../../../components/OnRampTransaction"
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";



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
export default async function() {
    const transactions=await getOnRampTransactions()
    return <div className="w-screen mx-6">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transactions
        </div>
        <div className="pt-2">
        <OnRampTransactions transactions={transactions}/>

        </div>
    </div>
}