"use client";

import ReviewsTable from "@/components/ReviewsTable";
import { RootState } from "@/redux/store";
import Reviews from "@/services/reviews.service";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

interface pageProps {}

const ReviewPage: FC<pageProps> = ({}) => {
  const loading = useSelector((state: RootState) => state.loading.loading);
  const reviewsApis = new Reviews();
  useEffect(() => {
    reviewsApis.getReviews()
  }, []);

  return (
    <section className="flex flex-col gap-7 ">
      <div className="flex justify-start items-center pl-4 lg:pl-6 bg-white w-full h-16">
        <h1 className="text-xl lg:pl-0 lg:text-2xl leading-3 text-afruna-blue font-bold">
          Review
        </h1>
      </div>

      {/* report table */}
      {loading ? (
        <>loading</>
      ) : (
        <div className="flex px-6 w-full">
          <ReviewsTable />
        </div>
      )}
    </section>
  );
};

export default ReviewPage;
