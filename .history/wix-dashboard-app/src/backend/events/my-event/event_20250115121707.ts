/**
This file contains:

- The relevant import statement for the event.
- An event function where you can implement your custom logic. Wix calls this function when the given event occurs, passing the event object and its metadata.

This file implements an example for the Wix CRM's Contact Created event.
To run this example please add the relevant permission (https://wix.to/APN0tpK) and install the `@wix/crm` dependency
SDK modules and their available events are documented here: https://dev.wix.com/docs/sdk
*/

import { contacts } from '@wix/crm';
import { orders } from '@wix/ecom'

contacts.onContactCreated((event) => {
  // Add you logic here
});

orders.onOrderUpdated((event) => {
  // Add you logic here
});
