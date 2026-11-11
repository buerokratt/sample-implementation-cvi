import { MenuItem } from "../../types/menuItem";

export const isSameRoot = (menuItem: MenuItem, serviceId: string[]): boolean => {
  const [, base, segment] = window.location.pathname.split("/");
  const currentService = base === 'chat' ? serviceId : [base];

  if (
    currentService.includes(menuItem.id!) &&
    menuItem.children?.some((item: MenuItem) => item.path?.includes("/" + segment))
  ) {
    return true;
  }

  return menuItem.children?.some(
    (child: MenuItem) => !!child.children && isSameRoot({ id: menuItem.id, ...child }, serviceId)
  ) ?? false;
}
