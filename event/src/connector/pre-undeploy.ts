import dotenv from 'dotenv';
dotenv.config();

import { createApiRoot } from '../client/create.client';

async function run(): Promise<void> {
  const apiRoot = createApiRoot();
  const {
    body: { results: subscriptions },
  } = await apiRoot
    .subscriptions()
    .get({
      queryArgs: {
        where: `key = "event-customer-subscription-key"`,
      },
    })
    .execute();

  if (subscriptions.length > 0) {
    const subscription = subscriptions[0];

    await apiRoot
      .subscriptions()
      .withKey({ key: "event-customer-subscription-key" })
      .delete({
        queryArgs: {
          version: subscription.version,
        },
      })
      .execute();
  }
}

run();
