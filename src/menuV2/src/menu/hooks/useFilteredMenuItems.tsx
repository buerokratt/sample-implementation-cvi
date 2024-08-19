import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MenuItem } from "../types/menuItem";
import useMenuItems from "./useMenuItems";
import { CountConf } from "../types/countConf";

const useFilteredMenuItems = (countConf?: CountConf) => {
  const items = useMenuItems(countConf);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const { data } = useQuery<{ response: [] }>({
    queryKey: ['accounts/user-role', 'prod'],
  });

  useEffect(() => {
    const filteredItems = items.filter((item) => {
      if (!data) {
        return;
      }
      const role: any[] = data.response;
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
  }, [items, data]);

  return menuItems;
}

export default useFilteredMenuItems;
