import { D, Q, S, Tape, Delta, head, tail, cons } from './tm';

type Maybe<T> = Just<T> | Nothing;

interface Just<T> {
  value: T;
  isJust: () => this is Just<T>;
  isNothing: () => this is Nothing;
}

interface Nothing {
  value: 'Nothing';
  isJust: () => this is Just<any>;
  isNothing: () => this is Nothing;
}

const makeJust = <T>(value: T): Just<T> => {
  const res: Just<T> = {
    value: value,
    isJust: () => true,
    isNothing: () => false,
  };

  return res;
};

const makeNothing = () => {
  const res: Nothing = {
    value: 'Nothing',
    isJust: () => false,
    isNothing: () => true,
  };

  return res;
};



const moveL = (tape: Tape): Tape  => {
  const [LList, h, RList] = tape;
  return [tail(LList), head(LList), cons(h, RList)];
};

const moveR = (tape: Tape): Tape => {
  const [LList, h, RList] = tape;
  return [cons(h, LList), head(RList), tail(RList)];
};

const move = (d: D, tape: Tape): Tape => {
  return d.isL() ? moveL(tape) : moveR(tape);
};

const find = <T>(a: T[], fn: (arg: T) => boolean): Maybe<T> => {
  const val = a.find(fn);
  return val ? makeJust(val) : makeNothing();
};

const exec = (delta: Delta, q: Q, tape: Tape): Tape => {
  const [_LList, h, _RList] = tape;
  
  const predicate = (row: [[Q, S], [Q, S, D]]) => {
    const [[_q, _s], _] = row;
    return _q.value === q.value && _s.value === h.value;
  };

  const result = find(delta, predicate);

  if (result.isNothing()) return tape;
  const [_, [_q, _s, _d]] = result.value;
  return exec(delta, _q, move(_d, [_LList, _s, _RList]));

};

export const evaluate = (state: Q, delta: Delta, tape: Tape) => exec(delta, state, tape);

