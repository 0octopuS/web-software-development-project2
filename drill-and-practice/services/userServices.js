import {sql} from '../database/database.js';

const findUsersWithEmail = async (email) => {
  return await sql`SELECT * FROM users WHERE email = ${email}`;
};

const addUser = async (email, passwordHash) => {
  await sql`INSERT INTO users (email, password) VALUES (${email}, ${
      passwordHash})`;
};

const isAdmin = async (id) => {
  const row = await sql`SELECT admin FROM users WHERE id = ${id}`;
  return row[0].admin === true;
};

export {addUser, findUsersWithEmail,isAdmin};
