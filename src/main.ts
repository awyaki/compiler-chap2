import { P, Tape, cons, mkI, mkNil } from './tm';
import { evaluate } from './eval';

const tape: Tape = [
  cons(mkI(), cons(mkI(), cons(mkI(), mkNil()))),
  mkI(),
  mkNil()
];

const [q0, delta] = P;
const output = evaluate(q0,delta, tape);

console.log(output);
