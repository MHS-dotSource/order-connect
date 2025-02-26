import dotenv from 'dotenv';
dotenv.config();

import { createApiRoot } from '../client/create.client';
import {HttpErrorType} from "@commercetools/sdk-client-v2"

async function createGcpPubSubSubscription() {
  const SUBSCRIPTION_KEY = 'event-customer-subscription-key';
  const topicName = "event-customer-topic";
  const projectId = "dotsource-test-1";
  // ...
  const apiRoot = createApiRoot();
  const result = await apiRoot
    .subscriptions()
    .post({
      body: {
        key: SUBSCRIPTION_KEY,
        destination: {
          type: 'GoogleCloudPubSub',
          topic: topicName,
          projectId,
        },
        messages: [
          {
            resourceTypeId: 'customer',
            types: ['CustomerCreated'],
          },
        ],
      },
    })
    .execute();
}

async function run() {
  try {
    await createGcpPubSubSubscription();
  } catch (error) {
    process.stderr.write(`Post-deploy failed: ${(error as HttpErrorType).message}\n`);
    process.exitCode = 1;
  }
}

run();
