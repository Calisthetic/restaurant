import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function PostTablesData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const roles = [
    {
      name: 'Админ'
    },
    {
      name: 'Повар'
    },
    {
      name: 'Официант'
    },
  ]
  const users = [
    {
      role_id: 1,
      first_name: 'Алексей',
      second_name: 'Сазонов',
      third_name: 'Святославович',
      email: 'sazonov@gmail.com',
      login: 'user1',
      password: '123456',
      gender: true
    },
    {
      role_id: 2,
      first_name: 'Елизавета',
      second_name: 'Шубина',
      third_name: 'Денисовна',
      email: 'shubina@gmail.com',
      login: 'user2',
      password: '123456',
      gender: false
    },
    {
      role_id: 2,
      first_name: 'Марк',
      second_name: 'Трофимов',
      third_name: 'Макарович',
      email: 'trofimov@gmail.com',
      login: 'user3',
      password: '123456',
      gender: true
    },
    {
      role_id: 3,
      first_name: 'Ангелина',
      second_name: 'Фролова',
      third_name: null,
      email: 'frolova@gmail.com',
      login: 'user4',
      password: '123456',
      gender: false
    },
    {
      role_id: 3,
      first_name: 'Михаил',
      second_name: 'Соколов',
      third_name: 'Константинович',
      email: 'sokolov@gmail.com',
      login: 'user5',
      password: '123456',
      gender: true
    },
  ]
  const dishes = [
    {
      name: 'Ничего',
      cook_time: 10,
    },
    {
      name: 'Окрошка',
      cook_time: 20,
    },
    {
      name: 'Картошка',
      cook_time: 10,
    },
  ]
  const recipes = [
    {
      dish_id: 1,
      text: ""
    },
  ]
  const ingredients = [
    {
      dish_id: 1,
      ingredient: "",
      count: "",
    },
  ]
  const tables = [
    {
      name: "1",
      capacity: 6
    },
    {
      name: "2",
      capacity: 6
    },
    {
      name: "3",
      capacity: 6
    },
    {
      name: "4",
      capacity: 6
    },
    {
      name: "5",
      capacity: 6
    },
    {
      name: "6",
      capacity: 8
    },
    {
      name: "7",
      capacity: 8
    },
    {
      name: "8",
      capacity: 8
    },
    {
      name: "9",
      capacity: 8
    },
    {
      name: "10",
      capacity: 4
    },
    {
      name: "11",
      capacity: 4
    },
    {
      name: "12",
      capacity: 2
    },
    {
      name: "13",
      capacity: 2
    },
    {
      name: "14",
      capacity: 2
    },
    {
      name: "15",
      capacity: 2
    },
    {
      name: "16",
      capacity: 2
    },
    {
      name: "17",
      capacity: 2
    },
    {
      name: "18",
      capacity: 2
    },
    {
      name: "19",
      capacity: 2
    },
  ]
  const table_reserves = [
    {
      user_name: "",
      user_phone: "79516579716",
      people_count: 4,
      reserve_at: new Date().toString(),
      message: null,
      table_id: 1,
    },
  ]

  try {
    for (let i = 0; i < roles.length; i++) {
      await sql`INSERT INTO roles (name) VALUES (${roles[i].name});`;
    }
    console.log("insert roles")
    for (let i = 0; i < users.length; i++) {
      const u = users[i]
      await sql`INSERT INTO users 
      (role_id, first_name, second_name, third_name, email, login, password, gender) VALUES 
      (${u.role_id}, ${u.first_name}, ${u.second_name}, ${u.third_name}, ${u.email}, ${u.login}, ${u.password}, ${u.gender});`;
    }
    console.log("insert users")
    for (let i = 0; i < dishes.length; i++) {
      await sql`INSERT INTO dishes (name, cook_time) VALUES (${dishes[i].name}, ${dishes[i].cook_time});`;
    }
    console.log("insert dishes")
    for (let i = 0; i < tables.length; i++) {
      await sql`INSERT INTO tables (name, capacity) VALUES (${tables[i].name}, ${tables[i].capacity});`;
    }
    console.log("insert tables")
    for (let i = 0; i < table_reserves.length; i++) {
      const t = table_reserves[i]
      await sql`INSERT INTO table_reserves 
      (user_name, user_phone, people_count, reserve_at, message, table_id) VALUES 
      (${t.user_name}, ${t.user_phone}, ${t.people_count}, ${t.reserve_at}, ${t.message}, ${t.table_id});`;
    }
    console.log("insert table_reserves")
    
    const result = await sql``;
    res.status(200).send({ result: "Success" });
  } catch (error) {
    res.status(500).send({ error });
  }
}