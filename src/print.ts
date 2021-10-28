import { List, S, mkNil, mkB, mkI, mkO, cons, Tape, Nil } from './tm';

export const listToStr = (list: List<S>): string => {
  const helper = (list: List<S>, acc: string): string => {
    if (list.isEmpty()) return acc + ', ' + list.value + ' ]';
    if (list.tail.isEmpty()) {
      return helper(list.tail, acc + list.value.value);
    };
    return helper(list.tail, acc + list.value.value + ', ');
  };

  return helper(list, '[ ');
};

const listToJSArray = (list: List<S>): (S | Nil)[] => {
  const helper = (list: List<S>, acc: (S | Nil)[]): (S | Nil)[] => {
    if (list.isEmpty()) return acc.concat(list);
    return helper(list.tail, acc.concat(list.value));
  };

  return helper(list, []);
};

export const tapeToStr = (tape: Tape): string => {
  const [LList, h, RList] = tape;
  const _LList = listToJSArray(LList).reverse().map((s) => s.value);
  const _RList = listToJSArray(RList).map((s) => s.value);

  const arrayToStr = (a: string[]): string => {
    const helper = (a: string[], acc: string): string => {
      if (a.length === 0) return acc + ' ]';
      if (a.slice(1).length === 0) return helper(a.slice(1), acc + a[0]);
      return helper(a.slice(1), acc + a[0] + ', ');
    };

    return helper(a, '[ ');
  };

  return arrayToStr([..._LList, '[' + h.value + ']', ..._RList]);
   
};



const list: List<S> = cons<S>(mkI(), cons<S>(mkO(), cons<S>(mkI(), cons<S>(mkO(), mkNil()))));

