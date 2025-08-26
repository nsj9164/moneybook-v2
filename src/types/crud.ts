import { TempId } from "./ids";

export type Insert<T> = T & { id?: TempId };
export type Update<T extends { id: number }> = Partial<T> & { id: number };
