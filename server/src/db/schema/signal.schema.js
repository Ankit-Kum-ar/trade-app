import {
  pgTable,
  uuid,
  varchar,
  numeric,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const directionEnum = pgEnum("direction", ["BUY", "SELL"]);

export const signalStatusEnum = pgEnum("signal_status", [
  "OPEN",
  "TARGET_HIT",
  "STOPLOSS_HIT",
  "EXPIRED",
]);

export const signals = pgTable("signals", {
  id: uuid("id").defaultRandom().primaryKey(),

  symbol: varchar("symbol", {
    length: 20,
  }).notNull(),

  direction: directionEnum("direction").notNull(),

  entryPrice: numeric("entry_price").notNull(),

  stopLoss: numeric("stop_loss").notNull(),

  targetPrice: numeric("target_price").notNull(),

  entryTime: timestamp("entry_time").notNull(),

  expiryTime: timestamp("expiry_time").notNull(),

  status: signalStatusEnum("status").default("OPEN").notNull(),

  realizedRoi: numeric("realized_roi"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
