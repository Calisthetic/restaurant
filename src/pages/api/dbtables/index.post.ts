import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function PostTables(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await sql`
    CREATE TABLE "roles" (
      "id" serial PRIMARY KEY,
      "name" varchar(50) NOT NULL
    );`;
    await sql`
    CREATE TABLE "users" (
      "id" serial PRIMARY KEY,
      "role_id" int NOT NULL DEFAULT 1,
      "first_name" varchar(20) NOT NULL,
      "second_name" varchar(20) NOT NULL,
      "third_name" varchar(20),
      "email" varchar(60) NOT NULL,
      "login" varchar(30),
      "password" varchar(30) NOT NULL,
      "gender" boolean DEFAULT true
    );`;
    await sql`
    CREATE TABLE "tables" (
      "id" serial PRIMARY KEY,
      "name" varchar(60) NOT NULL,
      "capacity" int NOT NULL
    );`;
    await sql`
    CREATE TABLE "table_reserves" (
      "id" serial PRIMARY KEY,
      "user_name" varchar(63) NOT NULL,
      "user_phone" varchar(30) NOT NULL,
      "people_count" int NOT NULL DEFAULT 1,
      "reserve_at" timestamp NOT NULL,
      "message" text,
      "user_id" int,
      "table_id" int NOT NULL
    );`;
    await sql`
    CREATE TABLE "dish_categories" (
      "id" serial PRIMARY KEY,
      "dish_category_name" varchar(63) NOT NULL
    );`;
    await sql`
    CREATE TABLE "dishes" (
      "id" serial PRIMARY KEY,
      "user_id" int,
      "category_id" int NOT NULL,
      "name" varchar(255) NOT NULL,
      "price" real NOT NULL,
      "portions" int DEFAULT 1,
      "cook_time" int
    );`;
    await sql`
    CREATE TABLE "ingredients" (
      "id" serial PRIMARY KEY,
      "dish_id" int NOT NULL,
      "ingredient" varchar(63) NOT NULL,
      "count" varchar(30)
    );`;
    const result = await sql`
    CREATE TABLE "recipes" (
      "id" serial PRIMARY KEY,
      "dish_id" int NOT NULL,
      "text" text NOT NULL
    );`;
    await sql`COMMENT ON COLUMN "users"."login" IS 'исп для входа в систему';`;
    await sql`COMMENT ON COLUMN "table_reserves"."user_id" IS 'Если пользователь был найден в базе';`;
    await sql`COMMENT ON COLUMN "ingredients"."count" IS 'Оставить null, если по вкусу';`;
    await sql`ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");`;
    await sql`ALTER TABLE "table_reserves" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");`;
    await sql`ALTER TABLE "table_reserves" ADD FOREIGN KEY ("table_id") REFERENCES "tables" ("id");`;
    await sql`ALTER TABLE "dishes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");`;
    await sql`ALTER TABLE "dishes" ADD FOREIGN KEY ("category_id") REFERENCES "dish_categories" ("id");`;
    await sql`ALTER TABLE "ingredients" ADD FOREIGN KEY ("dish_id") REFERENCES "dishes" ("id");`;
    await sql`ALTER TABLE "recipes" ADD FOREIGN KEY ("dish_id") REFERENCES "dishes" ("id");`;
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ error });
  }
}