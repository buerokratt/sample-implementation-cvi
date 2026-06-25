import { useEffect, useState } from 'react';
import useStore from "../store/store";

export const useMenuCountConf = () => {
  const unansweredChatsLength = useStore((state) => state.unansweredChatsLength());
  const { myChats, otherChats } = useStore((state) => state.getGroupedActiveChats());
  const pendingChatsLength = useStore((state) => state.pendingChatsLength());
  const validationChatsLength = useStore((state) => state.validationChatsLength());
  const activeChatsLength = useStore((state) => state.activeChatsLength());

  const [menuCountConf, setMenuCountConf] = useState({});

  useEffect(() => {
    setMenuCountConf({
      "/unanswered": unansweredChatsLength,
      "/active": activeChatsLength,
      "/pending": pendingChatsLength,
      "/validations": validationChatsLength,
    });
  }, [unansweredChatsLength, otherChats.length, myChats.length, pendingChatsLength, validationChatsLength]);

  return menuCountConf;
};
