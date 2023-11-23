import { useState, useEffect } from "react";
// import { ETimePeriod } from "@/constants/enums";
import { IConversation } from "@/types/user";

export default function useSearchConvo<T extends IConversation>({
	data = [],
	period,
}: {
	data: T[];
	period?: string;
}) {
	const [searchInput, setSearchInput] = useState<string>("");
	const [timePeriod, setTimePeriod] = useState<string | undefined>(period);
	const [sortingType, setSortingType] = useState<"ascending" | "descending">(
		"ascending"
	);
	const [searchResult, setSearchResult] = useState<T[]>([]);
	const [statusFilter, setStatusFilter] = useState<string | undefined>();

	useEffect(() => {
		// Your main filtering logic
		const filterData = () => {
			// Filter by search input
			const filterRecursive = (
				item: any,
				searchInput: string
			): boolean => {
				for (const key in item) {
					if (typeof item[key] === "object") {
						if (filterRecursive(item[key.toLowerCase()], searchInput.toLowerCase()))
							return true;
					} else if (
						typeof item[key] === "string" &&
						item[key]
							.toLowerCase()
							.includes(searchInput.toLowerCase())
					) {
						return true;
					}
				}
				return false;
			};

			const filterBySearchTextResult = data.filter((item) =>
				filterRecursive(item, searchInput)
			);

			// Filter by selected status
			/* const filterByStatus = filterBySearchTextResult.filter((item) => {
        if (statusFilter) {
          return item.userId..toLowerCase() === statusFilter.toLowerCase();
        }
        return true; // If no status is selected, return all data
      }); */

			// Apply time period filtering if timePeriod is provided
			let filteredData = filterBySearchTextResult;
			if (timePeriod?.toLowerCase()) {
				// filteredData = filterDataByTimePeriod(
				// 	filterBySearchTextResult,
				// 	timePeriod
				// );
			}

			if (sortingType.toLowerCase()) {
				// Sorting logic
				// const sortedData = sorting(filteredData, sortingType);
				// setSearchResult(sortedData);
			} else {
				setSearchResult(filteredData);
			}
		};
        console.log(searchInput);
        
		// Call filterData when searchInput, timePeriod, or sortingType changes
		filterData();
	}, [searchInput, timePeriod, period, sortingType, data, statusFilter]);

	return {
		searchInput,
		setSearchInput,
		setTimePeriod,
		sortingType,
		setSortingType,
		searchResult,
		statusFilter,
		setStatusFilter,
	};
}