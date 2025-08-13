import { nanoid } from "nanoid";

export type UUID = string;

export const createTempEntityId = (): TempId => `temp_${nanoid()}`;
export type TempId = `temp_${string}`;
