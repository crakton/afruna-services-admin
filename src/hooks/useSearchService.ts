import { useState, useEffect, useMemo } from "react";
import { IService } from "@/interfaces/IService";

export default function useSearchService<T extends IService>({
  data = [],
}: {
  data: T[];
}) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<T[]>([]);

  const filteredSer = useMemo(() => {
    if (!searchInput) {
      return data;
    }
    const normalizedSearchInput = searchInput.toLowerCase();
    const filtered = data.filter((ser) => {
      const normalizedSerName = ser?.name.toLowerCase();
      const normalizedSerCat = ser?.category?.name.toLowerCase();
      return (
        normalizedSerName.includes(normalizedSearchInput) ||
        normalizedSerCat.includes(normalizedSearchInput)
      );
    });
    return filtered;
  }, [searchInput, data]);

  useEffect(() => {
    setSearchResult(filteredSer);
  }, [filteredSer]);

  return {
    searchInput,
    setSearchInput,
    searchResult,
  };
}
