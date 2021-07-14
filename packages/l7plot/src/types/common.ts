export type ValueOf<T> = T[keyof T];

export interface IEvent {
  type: string;
  target?: any;
  [key: string]: any;
}
