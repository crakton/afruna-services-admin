import { useState, useEffect, useMemo } from "react";
import { ICustomerBio } from "@/types/customer";

export default function useSearchCustomer<T extends ICustomerBio>({
  data = [],
}: {
  data: T[];
}) {
  const [searchCustomerInput, setSearchCustomerInput] = useState<string>("");
  const [searchCustomerResult, setSearchCustomerResult] = useState<T[]>([]);

  const filteredUsers = useMemo(() => {
    if (!searchCustomerInput) {
      return data;
    }
    const normalizedSearchInput = searchCustomerInput.toLowerCase();
    const filtered = data.filter((user) => {
      const normalizedUserFullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const normalizedUserNumber = `${user.phoneNumber}`
      return (
        normalizedUserFullName.includes(normalizedSearchInput) ||
        normalizedUserNumber.includes(normalizedSearchInput)
      );
    });
    return filtered;
  }, [searchCustomerInput, data]);

  useEffect(() => {
    setSearchCustomerResult(filteredUsers);
  }, [filteredUsers]);

  return {
    searchCustomerInput,
    setSearchCustomerInput,
    searchCustomerResult,
  };
}
