"use client";

import OtherTransactionstable from "@/components/OtherTransactionstable";
import { RootState } from "@/redux/store";
import Transactions from "@/services/transactions.service";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

interface pageProps {}
export type tableStatus = "Other Transactions" | "Bookings Transactions";
const transactions_tab = ["Other Transactions", "Bookings Transactions"];

const TransactionsPage: FC<pageProps> = ({}) => {
  // const [transactionsTab, setTransactionsTab] =
  //   useState<tableStatus>("Other Transactions");
  // const handleTabSelect = useCallback((tab: tableStatus) => {
  //   const transactionApis = new Transactions();
  //   if (tab === "Other Transactions") {
  //     transactionApis.getOtherTransactions();
  //     setTransactionsTab(tab);
  //   } else {
  //     transactionApis.getBookingsTransactions();
  //     setTransactionsTab(tab);
  //   }
  // }, []);
  // const Component = useMemo(() => {
  //   const transactionApis = new Transactions();
  //   switch (transactionsTab) {
  //     case "Bookings Transactions":
  //       return <BookingsTransactionsTable />;
  //     default:
  //       transactionApis.getOtherTransactions();
  //       return <OtherTransactionstable />;
  //   }
  // }, [transactionsTab]);
 const transactionApis = new Transactions()
  useEffect(() => {
    transactionApis.getOtherTransactions()
  }, []);
  const transaction = useSelector((state:RootState) => state.transaction.other_transactions)

  return (
    <section className="flex flex-col gap-7 ">
      <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
        <h1 className="text-lg lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
          Transaction
        </h1>
      </div>
      {/* <div className="flex flex-col gap-6 px-6 xl:pr-16 w-full">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="border w-[25rem] py-6 px-6 border-[#D5D5E6] rounded-xl bg-white flex justify-between items-center gap-2">
            <div className="flex items-center justify-start gap-2">
              <div className="w-[4rem] h-[4rem] overflow-hidden relative">
                <Image src={imgs.wallet} alt="transaction" priority fill />
              </div>
              <div className="flex flex-col gap-2 justify-start items-start">
                <span className="text-sm font-semibold">Available Balance</span>
                <span className=" font-bold text-2xl">#200,000</span>
              </div>
            </div>
            <Button variant={"lightgradientblue"} className="">
              Transfer
            </Button>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row justify-start items-center">
            <div className="border w-[17rem] py-7 pl-7 border-[#D5D5E6] rounded-xl bg-white flex flex-col gap-2">
              <span className="text-sm font-bold">Total payout</span>
              <span className="text-2xl font-bold">#20,000</span>
            </div>
            <div className="border w-[17rem] py-7 pl-7 border-[#D5D5E6] rounded-xl bg-white flex flex-col gap-2">
              <span className="text-sm font-bold">Pending payout</span>
              <span className="text-2xl font-bold">#20,000</span>
            </div>
          </div>
        </div>
      </div> */}
      {/* table */}
      <div className="flex flex-col gap-6 px-6 xl:pr-4 w-full">
        {/* <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-start gap-8 items-center">
            {transactions_tab.map((item, idx) => (
              <button
                className={`${
                  transactionsTab === item && " text-sky-500"
                } text-afruna-blue text-sm md:text-base font-bold relative flex flex-col `}
                key={idx}
                onClick={() => handleTabSelect(item as tableStatus)}
              >
                {item}
                <div
                  className={`${
                    transactionsTab === item && "bg-sky-500"
                  } w-full h-[2px] absolute -bottom-[0.35rem]`}
                />
              </button>
            ))}
          </div>
          <div className="bg-orange-200 w-full h-[2px] " />
        </div> */}
        <OtherTransactionstable transaction={transaction} />
      </div>
    </section>
  );
};

export default TransactionsPage;
