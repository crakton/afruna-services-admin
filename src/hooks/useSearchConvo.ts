import { useState, useEffect, useMemo } from "react";
import { IConversation } from "@/types/user";

export default function useSearchConvo<T extends IConversation>({
  data = [],
}: {
  data: T[];
}) {
  const [searchConvoInput, setSearchConvoInput] = useState<string>("");
  const [searchConvoResult, setSearchConvoResult] = useState<T[]>([]);

  const filteredUsers = useMemo(() => {
    if (!searchConvoInput) {
      return data;
    }
    const normalizedSearchInput = searchConvoInput.toLowerCase();
    const filtered = data.filter((user) => {
      const normalizedUserFullName = `${user.alias}`.toLowerCase();
      const normalizedUserLastMessage = `${user.lastMessage}`.toLowerCase();
      return (
        normalizedUserFullName.includes(normalizedSearchInput) ||
        normalizedUserLastMessage.includes(normalizedSearchInput)
      );
    });
    return filtered;
  }, [searchConvoInput, data]);

  useEffect(() => {
    setSearchConvoResult(filteredUsers);
  }, [filteredUsers]);

  return {
    searchConvoInput,
    setSearchConvoInput,
    searchConvoResult,
  };
}
