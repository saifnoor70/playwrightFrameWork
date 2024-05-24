import { test, expect } from '@playwright/test';
const recharge_amount = '27';
const cashback_amount = '9';
const start_date = '2024-05-31 21:00:00';
const end_date = '2024-05-31 22:00:00';
var campaign_code = 'foheofiehabcd';

test('test', async ({ page }) => {
  await page.goto('http://172.16.191.50:7443/login');
  await page.getByPlaceholder('Your email address').click();
  await page.getByPlaceholder('Your email address').fill('mybl-admin@admin.com');
  await page.getByPlaceholder('Enter Password').click();
  await page.getByPlaceholder('Enter Password').fill('Banglalink@2020');
  await page.getByRole('button', { name: ' Login' }).click();
  await page.getByRole('link', { name: ' Connect ' }).click();
  await page.getByRole('link', { name: ' Campaigns ' }).click();
  await page.getByRole('link', { name: ' Cash Back' }).click();
  await page.getByRole('link', { name: ' Create Campaign' }).click();
  await page.getByPlaceholder('Campaign Code').click();
  await page.getByPlaceholder('Campaign Code').fill(campaign_code);
  await page.getByPlaceholder('Title').click();
  await page.getByPlaceholder('Title').fill('bKash Cashback');
  const locator = page.getByLabel('Start Date');
  const isStartDateAvailable = await locator.isVisible();
  console.log(isStartDateAvailable);
  if(isStartDateAvailable){
    await page.getByLabel('Start Date').fill(start_date)
  }
  else{
    console.log('Start Date Locator is missing');
  }

  await page.getByLabel('End Date').fill(end_date);
  await page.locator('#feed-form').getByRole('list').nth(1).click();
  await page.getByRole('treeitem', { name: 'SSL' }).click();
  await page.locator('input[type="search"]').click();
  await page.getByRole('treeitem', { name: 'Bkash(Checkout)' }).click();
  await page.getByText('×SSL×Bkash(Checkout)').click();
  await page.getByRole('treeitem', { name: 'Bkash(One-Tap)' }).click();
  await page.getByText('×SSL×Bkash(Checkout)×Bkash(').click();
  await page.getByRole('treeitem', { name: 'PortWallet' }).click();
  await page.getByPlaceholder('Please select recharge amount').fill(recharge_amount);
  await page.getByPlaceholder('Please select cash back amount').fill(cashback_amount);
  await page.locator('#navigate_action').selectOption('1');
  await page.getByRole('textbox', { name: 'Please select start date' }).click();
  await page.getByRole('textbox', { name: 'Please select end date' }).click();
  await page.getByRole('cell', { name: '31' }).click();
  await page.getByLabel('Active', { exact: true }).check();
  await page.getByRole('button', { name: ' Save' }).click();
  await page.pause();
});


// test('test2', async ({ page }) => {
//   await page.goto('http://172.16.191.50:7443/login');
//   await page.getByPlaceholder('Your email address').click();
//   await page.getByPlaceholder('Your email address').fill('mybl-admin@admin.com');
//   await page.getByPlaceholder('Enter Password').click();
//   await page.getByPlaceholder('Enter Password').fill('Banglalink@2020');
//   await page.getByRole('button', { name: ' Login' }).click();
//   await page.getByRole('link', { name: ' Connect ' }).click();
//   console.log('test2')
//   await page.pause();
// //   await page.getByRole('link', { name: ' Campaigns ' }).click();
// //   await page.getByRole('link', { name: ' Cash Back' }).click();
// //   await page.getByRole('row', { name: '1 bKash Cashback 2024-05-12' }).getByRole('link').click();
// //   await page.getByRole('button', { name: 'Yes, delete it!' }).click();
// });