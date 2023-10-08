// type Util<T> = {
//   [Prop in keyof T]: T[Prop];
// };

// type Values<T> = T[keyof T];

export type ChildComponent = { [key: string]: string | { [key: string]: string } };

export type ChildComponentSelected<C> = C[keyof C];