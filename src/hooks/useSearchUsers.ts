import { useState, useEffect, useMemo } from "react";
import { ETimePeriod } from "@/constants/enums";
import { IUserBio } from "@/types/user";

export default function useSearchUsers<T extends IUserBio>({
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

  const filteredUsers = useMemo(() => {
    if (!searchInput) {
      return data;
    }

    const normalizedSearchInput = searchInput.toLowerCase();

    const filtered = data.filter((user) => {
      const normalizedUserFullName =
        `${user.firstName} ${user.lastName}`.toLowerCase();
      const normalizedUserRole = user.role.toLowerCase();
      return (
        normalizedUserFullName.includes(normalizedSearchInput) ||
        normalizedUserRole.includes(normalizedSearchInput)
      );
    });

    return filtered;
  }, [searchInput, data]);

  useEffect(() => {
    setSearchResult(filteredUsers);
  }, [filteredUsers]);
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

function filterDataByTimePeriod<T extends IUserBio>(
  data: T[],
  timePeriod: string
) {
  const currentTime = new Date();

  // Calculate the start date based on the selected time period
  let startDate = new Date().getTime();
  switch (timePeriod.toLowerCase()) {
    case ETimePeriod.THREE_DAYS:
      startDate = new Date(
        currentTime.getTime() - 3 * 24 * 60 * 60 * 1000
      ).getTime();
      break;
    case ETimePeriod.ONE_WEEK:
      startDate = new Date(
        currentTime.getTime() - 8 * 24 * 60 * 60 * 1000
      ).getTime();
      break;
    case ETimePeriod.TWO_MONTH:
      // Calculate the start date as three months ago from the current date
      startDate = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth() - 1, // Subtract 1 to go back 2 months
        1
      ).getTime();
      break;
    case ETimePeriod.SIX_MONTH:
      // Calculate the start date as six months ago from the current date
      startDate = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth() - 6,
        1
      ).getTime();
      break;
    case ETimePeriod.THIS_MONTH:
      // Calucate the start date from current month
      startDate = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        1
      ).getTime();
      break;
    default:
      // Handle unsupported time periods or custom logic here
      startDate = startDate = new Date(currentTime.getFullYear()).getTime();
      break;
  }

  // Filter data based on the createdAt field
  const filteredData = data.filter((item) => {
    const itemCreatedAt = new Date(item.createdAt as string).getTime();

    // Compare the item's createdAt date with the selected time period
    return itemCreatedAt >= startDate && itemCreatedAt <= currentTime.getTime();
  });

  return filteredData;
}

function sorting<T extends IUserBio>(
  items: T[],
  sortingType: "ascending" | "descending"
) {
  return items.slice().sort((a, b) => {
    // Create a copy using slice()
    const multiplier = sortingType.toLowerCase() === "ascending" ? 1 : -1;
    return (
      multiplier *
      (new Date(a.createdAt as string).getTime() -
        new Date(b.createdAt as string).getTime())
    );
  });
}
