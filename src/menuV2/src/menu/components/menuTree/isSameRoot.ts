import { MenuItem } from "../../types/menuItem";

export const isSameRoot = (menuItem, serviceId) => {
  const base = window.location.pathname.split("/")[1];
  const currentService = base === 'chat' ? serviceId : [base];
  if(currentService.includes(menuItem.id)) {
    return menuItem.children.some((item: MenuItem) => item.path?.includes("/" + window.location.pathname.split("/")[2]));
  }
  return false;
}
