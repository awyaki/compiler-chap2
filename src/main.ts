import { P, Tape, cons, mkI, mkNil, mkO, S } from './tm';
import { evaluate } from './eval';
import { tapeToStr } from './print';

const tape: Tape = [
  cons(mkI(), cons(mkI(), cons(mkI(), mkNil()))),
  mkI(),
  mkNil()
];

const [q0, delta] = P;
const output = evaluate(q0, delta, tape);

const testTape: Tape = [
  cons<S>(mkI(), cons<S>(mkO(), mkNil())),
  mkO(),
  cons<S>(mkI(), cons<S>(mkO(), mkNil()))
];


console.log(tapeToStr(testTape));
console.log(tapeToStr(tape));
console.log(tapeToStr(output));
