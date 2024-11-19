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
    if (!data) {
      return;
    }
    
    const roles: any[] = data.response;
    const rolePermissions = {
      ROLE_ADMINISTRATOR: ["conversations", "training", "analytics", "services", "settings", "monitoring"],
      ROLE_SERVICE_MANAGER: ["training", "services", "monitoring"],
      ROLE_CUSTOMER_SUPPORT_AGENT: ["conversations", "monitoring"],
      ROLE_CHATBOT_TRAINER: ["training", "monitoring"],
      ROLE_ANALYST: ["analytics", "monitoring"],
    };

    let permissions = new Set();

    roles.forEach((role) => {
      if (rolePermissions[role]) {
        rolePermissions[role].forEach((permission: any) => permissions.add(permission));
      }
    });

    const filteredItems = items.filter((item: any) => {
      return permissions.has(item.id);
    });

    setMenuItems(filteredItems ?? []);
  }, [items, data]);

  return menuItems;
}

export default useFilteredMenuItems;
