import {sql} from '../database/database.js';

const findAccountWithUserId = async (userId) => {
  return await sql`SELECT * FROM accounts WHERE user_id = ${userId}`;
};

const addAccount = async (name, userId) => {
  await sql`INSERT INTO accounts (name, user_id) VALUES (${name}, ${userId})`;
};

const findAccountWithUserIdAndAccountID = async (userID, accountId) => {
  return await sql`SELECT * FROM accounts WHERE user_id = ${userID} AND id = ${
      accountId}`;
};

const findAccountWithAccountID = async (accountId) => {
  return await sql`SELECT * FROM accounts WHERE id = ${accountId}`;
};

const findBalance =
    async (id) => {
  return await sql`SELECT balance FROM accounts WHERE id = ${id}`;
}

const updateAccount = async (change, id) => {
  await sql`UPDATE accounts SET balance = balance + ${change} WHERE id = ${id}`;
};

export {
  addAccount,
  findAccountWithUserId,
  findAccountWithUserIdAndAccountID,
  updateAccount,
  findBalance,
  findAccountWithAccountID
};
