"use client";

import ReviewsTable from "@/components/ReviewsTable";
import { FC } from "react";

interface pageProps {}

const ReviewPage: FC<pageProps> = ({}) => {
  return (
    <section className="flex flex-col gap-7 ">
      <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
        <h1 className="text-xl lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
          Review
        </h1>
      </div>

      {/* report table */}
      <div className="flex px-6  w-full">
        <ReviewsTable />
      </div>
    </section>
  );
};

export default ReviewPage;
