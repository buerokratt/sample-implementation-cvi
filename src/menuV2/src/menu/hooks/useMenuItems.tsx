import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import menuStructure from '../data/menu-structure.json';
import { MenuItem } from "../types/menuItem";

const useMenuItems = () => {
  const externalMenuItems = import.meta.env.REACT_APP_MENU_JSON;
  const cachedMenu = getMenuCache();
  const [mainMenuItems, setMainMenuItems] = useState<MenuItem[] | null>(cachedMenu ?? []);

  useQuery({
    enabled: !externalMenuItems && !cachedMenu,
    queryKey: [import.meta.env.REACT_APP_MENU_URL + import.meta.env.REACT_APP_MENU_PATH],
    onSuccess: (res: any) => {
      try {
        setMainMenuItems(res);
        setCache(res);
      } catch (e) {
        console.error(e);
      }
    },
    onError: () => {
      setMainMenuItems(cachedMenu);
    },
  });

  const items = useMemo(() => {
    let externals;
    
    try {
      if(externalMenuItems) {
        externals = JSON.parse(externalMenuItems);
        if(!Array.isArray(externals)) {
          console.warn('REACT_APP_MENU_JSON was ignored becuase it wasn\'t an array');
        }
      }
    } catch (e) {
      console.warn(e);
    }

    return externals ?? mainMenuItems ?? menuStructure ?? [];
  }, [externalMenuItems, mainMenuItems, menuStructure]);
  
  return items;
}

function getMenuCache(): any {
  const cached = getCache();
  if(Array.isArray(cached) && cached.length > 0)
    return cached;
  return null;
}

function getCache(): any {
  const cache = localStorage.getItem('mainmenu-cache') ?? '[]';
  return JSON.parse(cache);
}

function setCache(res: any) {
  localStorage.setItem('mainmenu-cache', JSON.stringify(res));
}

export default useMenuItems;
