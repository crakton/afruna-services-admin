import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { useConversation } from "./useConversation";
import { AiFillAccountBook } from "react-icons/ai";
import { MdChat, MdDashboard, MdGroups2, MdPeopleAlt, MdReviews, MdSettings } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { IoMdBriefcase } from "react-icons/io";
import { LuPanelTop } from "react-icons/lu";

export const useRoute = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const params = useParams();

  const customerId = useMemo(() => {
    if (!params?.customerId) {
      return "";
    }
    return params.customerId as string;
  }, [params?.customerId]);

  const providerId = useMemo(() => {
    if (!params?.providerId) {
      return "";
    }
    return params.providerId as string;
  }, [params?.providerId]);

  const accountRoutes = useMemo(
    () => [
      {
        title: "Dashboard",
        icon: MdDashboard,
        active: pathname === "/dashboard",
        href: "/dashboard",
        hasSubNav: false,
      },
      {
        title: "Services",
        icon: IoMdBriefcase,
        active:
          pathname === "/services" ||
          pathname === "create_service" ||
          pathname === "/category" ||
          pathname === "/create_category" ||
          pathname === "/subcategory" ||
          pathname === "/create_subcategory",
        href: "/services",
        hasSubNav: true,
      },
      {
        title: "Bookings",
        icon: AiFillAccountBook,
        active: pathname === "/bookings",
        href: "/bookings",
        hasSubNav: false,
      },
      {
        title: "Providers",
        icon: MdPeopleAlt,
        active: pathname === "/providers" || !!providerId,
        href: "/providers",
        hasSubNav: false,
      },
      {
        title: "Users",
        icon: MdGroups2,
        active: pathname === "/users" || !!customerId,
        href: "/users",
        hasSubNav: false,
      },
      {
        title: "Transactions",
        icon: LuPanelTop,
        active: pathname === "/transactions",
        href: "/transactions",
        hasSubNav: false,
      },
      {
        title: "Chat",
        icon: MdChat,
        active: pathname === "/chat" || !!conversationId,
        href: "/chat",
        hasSubNav: false,
      },
      {
        title: "Review",
        icon: MdReviews,
        active: pathname === "/review",
        href: "/review",
        hasSubNav: false,
      },
      {
        title: "Abuse Reports",
        icon: TbReportAnalytics,
        active: pathname === "/abuse_reports",
        href: "/abuse_reports",
        hasSubNav: false,
      },
      // {
      //   title: "Settings",
      //   icon: MdSettings,
      //   active: pathname === "/profile",
      //   href: "/profile",
      // },
    ],
    [pathname, conversationId]
  );

  return accountRoutes;
};
