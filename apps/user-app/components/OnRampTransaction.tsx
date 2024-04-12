import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    transactionType: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div
            className="flex justify-between border-b"
            key={t.time.toString()}
          >
            <div>
              {t.transactionType === "Sent" ? (
                <div className="text-sm">Sent INR</div>
              ) : (
                <div className="text-sm">Received INR</div>
              )}
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            {
                t.transactionType==='Sent'?(
                    <div className="flex flex-col justify-center text-red-500">
                    - Rs {t.amount / 100}
                  </div>
                ):(
                    <div className="flex flex-col justify-center text-green-500">
                    + Rs {t.amount / 100}
                  </div>
                )
            }
           
          </div>
        ))}
      </div>
    </Card>
  );
};
