'use client'

import ReportTable from "@/components/ReportTable";
import { FC } from "react";

interface pageProps {}

const AbuseReportpage: FC<pageProps> = ({}) => {
  return (
    <section className="flex flex-col gap-7 ">
      <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
        <h1 className="text-xl lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
          Abuse Reports
        </h1>
      </div>

      {/* report table */}
      <div className="flex px-6 xl:pr-32 w-full">
        <ReportTable />
      </div>
    </section>
  );
};

export default AbuseReportpage;
