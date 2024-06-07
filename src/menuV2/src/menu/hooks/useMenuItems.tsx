import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import menuStructure from '../data/menu-structure.json';
import { MenuItem } from "../types/menuItem";

const useMenuItems = () => {
  const externalMenuItems = import.meta.env.REACT_APP_MENU_JSON;

  const [mainMenuItems, setMainMenuItems] = useState<MenuItem[] | null>([]);

  useQuery({
    enabled: !externalMenuItems,
    queryKey: [import.meta.env.REACT_APP_MENU_URL + import.meta.env.REACT_APP_MENU_PATH],
    onSuccess: (res: any) => {
      try {
        setMainMenuItems(res);
      } catch (e) {
        setMainMenuItems(null);
        console.error(e);
      }
      setCache(res);
    },
    onError: () => {
      const cached = getCache();
      if(cached.length > 0) 
        setMainMenuItems(cached);
      else
        setMainMenuItems(null);
    },
  });

  const items = useMemo(() => {
    let externals;
    
    try {
      externals = JSON.parse(externalMenuItems);
      if(!externals.isArray) {
        console.error('REACT_APP_MENU_JSON was ignored becuase it wasn\'t an array');
      }
    } catch (e) {
      console.error(e);
    }

    const allItems = externals ?? mainMenuItems ?? menuStructure ?? [];
    return allItems.filter(x => !x.hidden);
  }, [externalMenuItems, mainMenuItems, menuStructure]);
  
  return items;
}

function getCache(): any {
  const cache = localStorage.getItem('mainmenu-cache') ?? '[]';
  return JSON.parse(cache);
}

function setCache(res: any) {
  localStorage.setItem('mainmenu-cache', JSON.stringify(res));
}

export default useMenuItems;
