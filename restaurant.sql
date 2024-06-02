CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "role_id" int NOT NULL DEFAULT 1,
  "first_name" varchar(20) NOT NULL,
  "second_name" varchar(20) NOT NULL,
  "third_name" varchar(20),
  "email" varchar(60) NOT NULL,
  "login" varchar(30),
  "password" varchar(30) NOT NULL,
  "gender" bool DEFAULT true
);

CREATE TABLE "roles" (
  "id" serial PRIMARY KEY,
  "name" varchar(50) NOT NULL
);

CREATE TABLE "tables" (
  "id" serial PRIMARY KEY,
  "name" varchar(60) NOT NULL,
  "capacity" int NOT NULL
);

CREATE TABLE "table_reserves" (
  "id" serial PRIMARY KEY,
  "user_name" varchar(63) NOT NULL,
  "user_email" varchar(63),
  "user_phone" varchar(30),
  "people_count" int NOT NULL DEFAULT 1,
  "reserve_at" TIMESTAMP WITH TIME ZONE NOT NULL,
  "message" varchar,
  "user_id" int,
  "table_id" int NOT NULL
);

CREATE TABLE "dish_categories" (
  "id" serial PRIMARY KEY,
  "dish_category_name" varchar(63) NOT NULL
);

CREATE TABLE "dishes" (
  "id" serial PRIMARY KEY,
  "user_id" int,
  "category_id" int NOT NULL,
  "name" varchar(255) NOT NULL,
  "portions" int DEFAULT 1,
  "cook_time" int
);

CREATE TABLE "ingredients" (
  "id" serial PRIMARY KEY,
  "dish_id" int NOT NULL,
  "ingredient" varchar(63) NOT NULL,
  "count" int
);

CREATE TABLE "recipes" (
  "id" serial PRIMARY KEY,
  "dish_id" int NOT NULL,
  "text" text NOT NULL
);

COMMENT ON COLUMN "users"."login" IS 'исп для входа в систему';

COMMENT ON COLUMN "table_reserves"."user_email" IS 'email or phone';

COMMENT ON COLUMN "table_reserves"."user_id" IS 'Если пользователь был найден в базе';

COMMENT ON COLUMN "ingredients"."count" IS 'Оставить null, если `по вкусу`';

ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "table_reserves" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "table_reserves" ADD FOREIGN KEY ("table_id") REFERENCES "tables" ("id");

ALTER TABLE "dishes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "dishes" ADD FOREIGN KEY ("category_id") REFERENCES "dish_categories" ("id");

ALTER TABLE "ingredients" ADD FOREIGN KEY ("dish_id") REFERENCES "dishes" ("id");

ALTER TABLE "recipes" ADD FOREIGN KEY ("dish_id") REFERENCES "dishes" ("id");
