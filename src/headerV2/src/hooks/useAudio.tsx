import ding from '../assets/ding.mp3';
import newMessageSound from '../assets/newMessageSound.mp3';

export const useDing = () => {
  return new Audio(ding);
}

export const useNewMessageSound = () => {
  return new Audio(newMessageSound);
}
