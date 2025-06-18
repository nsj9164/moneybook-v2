import { nanoid } from "nanoid";

export type UUID = string;

export const createTempEntityId = (): EntityId => `temp_${nanoid()}`;
export type EntityId = number | `temp_${string}`;
