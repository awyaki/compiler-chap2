export type List<T> = SList<T> | Nil;
interface SList<T> {
  value: T;
  tail: List<T>;
  isEmpty: () => this is Nil;
  isNotEmpty: () => this is SList<T>;
} 

export interface Nil {
  value: 'nil';
  isEmpty: () => this is Nil;
  isNotEmpty: () => this is SList<any>;
}

export const cons = <T>(v: T, list: List<T>): List<T> => {
  return {
    value: v,
    tail: list,
    isEmpty: () => false,
    isNotEmpty: () => true,
  };
};

export const head = (slist: List<S>): S => slist.isNotEmpty() ? slist.value : mkB();

export const tail = (slist: List<S>): List<S> => slist.isEmpty() ? mkNil() : slist.tail;

export const mkNil = (): Nil => {
  return {
    value: 'nil',
    isEmpty: () => true,
    isNotEmpty: () => false,
  };
};

export type D = R | L; 

export interface R {
  value: 'R';
  isR: () => this is R;
  isL: () => this is L;
};

export interface L {
  value: 'L';
  isR: () => this is R;
  isL: () => this is L;
};

export const mkR = (): R => {
  return { 
    value: 'R',
    isR: () => true,
    isL: () => false,
  };
};

export const mkL = (): L => {
  return { 
    value: 'L',
    isR: () => false,
    isL: () => true,
  };
};


export type S = B | I | O;

export type B = {
  value: 'B';
};

export type I = {
  value: 'I';
};

export type O = {
  value: 'O';
};

export type Q = M | H;

export type M = {
  value: 'M';
};

export type H = {
  value: 'H';
};

export type Delta = [[Q, S], [Q, S, D]][];
export type Program = [Q, Delta];
export type Tape = [List<S>, S, List<S>];


export const mkB = (): B => {
  return { value: 'B' };
};

export const mkI = (): I => {
  return { value: 'I' };
};

export const mkO = (): O => {
  return { value: 'O' };
};

export const mkM = (): M => {
  return { value: 'M' };
};

export const mkH = (): H => {
  return { value: 'H' };
};

export const P: Program = [mkM(), [[[mkM(), mkI()], [mkM(), mkO(), mkL()]],
                            [[mkM(), mkO()], [mkH(), mkI(), mkL()]],
                            [[mkM(), mkB()], [mkH(), mkI(), mkL()]]]];
