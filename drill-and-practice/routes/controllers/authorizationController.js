import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

import * as accountService from '../../services/accountService.js';



const showAccounts = async ({render, state}) => {
  const userId = (await state.session.get('user')).id;
  const rows = await accountService.findAccountWithUserId(userId);
  // console.log(rows);
  render('accounts.eta', {accounts: rows});
};

const postAccounts = async ({request, response, state}) => {
  const body = request.body();
  const params = await body.value;

  const name = params.get('name');
  const userId = (await state.session.get('user')).id;
  await accountService.addAccount(name, userId);

  response.redirect('/accounts');
};

const showAccount = async ({params, render}) => {
  const accountId = params.id;
  const rows = await accountService.findAccountWithAccountID(accountId);
  const obj = rows[0];
  render('account.eta', obj);
};

const depositAccount = async ({request, state, params, response}) => {
  const body = request.body();
  const pparams = await body.value;
  const amount = pparams.get('amount');
  const accountId = params.id;
  const userId = (await state.session.get('user')).id;
  console.log(amount, userId, accountId);
  const rows =
      await accountService.findAccountWithUserIdAndAccountID(userId, accountId);
  if (rows.length === 0) {
    response.status = 401;
    return;
  }
  const obj = rows[0];
  await accountService.updateAccount(amount, obj.id);
  response.redirect('/accounts')
};

const withdrawAccount = async ({request, state, params, response}) => {
  const body = request.body();
  const pparams = await body.value;
  const amount = pparams.get('amount');
  const accountId = params.id;
  const userId = (await state.session.get('user')).id;

  const rows =
      await accountService.findAccountWithUserIdAndAccountID(userId, accountId);
  if (rows.length === 0) {
    response.status = 401;
    return;
  }
  const obj = rows[0];
  const balance = await accountService.findBalance(accountId);


  if (parseInt(balance[0].balance) < parseInt(amount)) {
    response.status = 401;
    return;
  }
  await accountService.updateAccount(-amount, obj.id);
  response.redirect('/accounts')
};

export {
  showAccount,
  showAccounts,
  postAccounts,
  depositAccount,
  withdrawAccount
};