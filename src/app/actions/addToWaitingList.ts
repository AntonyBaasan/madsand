'use server'

import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API,
  server: process.env.MAILCHIMP_SERVER,
});

export async function addToWaitingList(formData: FormData) {

  console.log('Added to waiting list:', formData);
  const email = formData.get('email')?.toString();

  if (!email) {
    throw new Error('Email is required');
  }
  const listId = process.env.MAILCHIMP_LIST_ID;

  if (!listId) {
    throw new Error('Mailchimp List ID is not configured');
  }

  console.log('listId', listId);

  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'pending', // Use 'pending' for double opt-in
    });
    console.log('mailchimp response: ', response);
  } catch (error) {
    console.error('Error adding to waiting list:', error);
  }


}