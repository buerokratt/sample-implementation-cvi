import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MenuItem } from "../types/menuItem";
import useMenuItems from "./useMenuItems";

const useFilteredMenuItems = () => {
  const items = useMenuItems();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useQuery({
    queryKey: ['accounts/user-role', 'prod'],
    onSuccess: (res: any) => {
      const filteredItems = items.filter((item) => {
        const role = res.response;
        if (role.includes('ROLE_ADMINISTRATOR'))
          return item.id;
        if (role.includes('ROLE_SERVICE_MANAGER'))
          return item.id != "settings" && item.id != "training";
        if (role.includes('ROLE_CUSTOMER_SUPPORT_AGENT'))
          return item.id != "settings" && item.id != "analytics";
        if (role.includes('ROLE_CHATBOT_TRAINER'))
          return item.id != "settings" && item.id != "conversations";
        if (role.includes('ROLE_ANALYST'))
          return item.id == "analytics" || item.id == "monitoring"; 
      });
      setMenuItems(filteredItems ?? []);
    },
  });

  return menuItems;
}

export default useFilteredMenuItems;
