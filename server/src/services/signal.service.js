import { db } from "../config/db.js";
import { signals } from "../db/schema/signal.schema.js";
import { eq } from "drizzle-orm";

export const createSignalService = async (data) => {
  const processedData = {
    ...data,
    entryTime: new Date(data.entryTime),
    expiryTime: new Date(data.expiryTime),
  };
  const result = await db.insert(signals).values(processedData).returning();
  return result[0];
};

export const getAllSignalsService = async () => {
  return await db.select().from(signals);
};

export const getSignalByIdService = async (id) => {
  const result = await db.select().from(signals).where(eq(signals.id, id));
  return result[0];
};

export const deleteSignalService = async (id) => {
  const result = await db.delete(signals).where(eq(signals.id, id)).returning();
  return result[0];
};
