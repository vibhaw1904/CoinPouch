import { OnRampTransactions } from "../../../components/OnRampTransaction"
import { getOnRampTransactions } from "../transfer/page"

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