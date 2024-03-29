// import { Notification } from '@playground.exchange/protobuf/play/pa/services/console/v1/console_pb';

export const notificationState = {
  0: {
    ID: 0,
    icon: 'help',
    value: 'Unspecified',
    description: 'No notification state available',
    // state: Notification.State.STATE_UNSPECIFIED,
    color: 'primary',
  },
  1: {
    ID: 1,
    icon: 'info',
    value: 'Info',
    description: 'Information State',
    // state: Notification.State.INFO,
    color: 'primary',
  },
  2: {
    ID: 2,
    icon: 'priority_high',
    value: 'Warning',
    description: 'Warning State',
    // state: Notification.State.WARNING,
    color: 'warning',
  },
  3: {
    ID: 3,
    icon: 'error',
    value: 'Error',
    description: 'Error State',
    // state: Notification.State.ERROR,
    color: 'error',
  },
  4: {
    ID: 4,
    icon: 'sync',
    value: 'Running',
    description: 'Running State',
    // state: Notification.State.RUNNING,
    color: 'primary',
  },
  5: {
    ID: 5,
    icon: 'check_circle',
    value: 'Success',
    description: 'Success State',
    // state: Notification.State.SUCCESS,
    color: 'success',
  },
};
