import { defineStore, acceptHMRUpdate } from 'pinia';
import { CreateTimestampNow } from '../utils/utils';
// import {
//   CreateNotificationRequest,
//   DeleteNotificationRequest,
//   ListNotificationsRequest,
//   Notification,
//   UpdateNotificationRequest,
// } from '@playground.exchange/protobuf/play/pa/services/console/v1/console_pb';
import client from '../client';
import { type Ref, ref } from 'vue';

const STORE_ID = 'notifications';

export const useNotificationsStore = defineStore(STORE_ID, () => {
  // Ref
  const notifications: Ref<Notification[]> = ref([]);
  const badgeVisible: Ref<boolean> = ref(false);

  // Functions

  async function listNotifications() {
    try {
      let req = new ListNotificationsRequest();

      let res = await client.listNotifications(req);

      if (res) {
        this.notifications = res.getNotificationsList();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function createNotification(notification: Notification) {
    try {
      let req = new CreateNotificationRequest();
      req.setNotification(notification);

      let res = await client.createNotification(req);

      if (res) {
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function updateNotification(
    notification: Notification,
    paths: string[],
  ) {
    try {
      let req = new UpdateNotificationRequest();
      req.setNotification(notification);
      paths.forEach((path) => {
        req.getUpdateMask()?.addPaths(path);
      });

      let res = await client.updateNotification(req);

      if (res) {
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteNotificiation(notification: string) {
    try {
      let req = new DeleteNotificationRequest();
      req.setName(notification);

      await client.deleteNotification(req);
    } catch (error) {
      console.log(error);
    }
  }

  // Examples of adding and updating of notifications that have been defined
  // async function createAddBookNotification(
  //   operation: string,
  //   book_title: string,
  // ) {
  //   let newNotification = new Notification();

  //   newNotification.setTitle('Adding Book');
  //   newNotification.setSubtitle(book_title);
  //   newNotification.setOperation(operation);
  //   newNotification.setUpdateTime(CreateTimestampNow());
  //   newNotification.setState(Notification.State.RUNNING);
  //   newNotification.setType(Notification.Type.ADD_BOOK);

  //   let res = await this.createNotification(newNotification);
  //   if (res) {
  //     this.notifications.unshift(res);
  //   }

  //   this.showBadge();

  //   return res;
  // }
  // function updateAddBookNotificationState(
  //   notification: string,
  //   updateState: Notification.State,
  //   errorMessage: string,
  // ) {
  //   const foundNotification = this.notifications.find(
  //     (obj) => obj.getName() === notification,
  //   );

  //   if (foundNotification) {
  //     foundNotification.setState(updateState);
  //     foundNotification.setUpdateTime(CreateTimestampNow());

  //     switch (updateState) {
  //       case Notification.State.ERROR:
  //         foundNotification.setErrorMessage(errorMessage);
  //     }

  //     this.updateNotification(foundNotification, ['state', 'error_message']);

  //     this.showBadge();
  //   }
  // }

  function clearAll() {
    this.notifications.forEach((notif) => {
      this.deleteNotificiation(notif.getName());
    });

    this.notifications = [];
  }
  function showBadge() {
    this.badgeVisible = true;
  }
  function hideBadge() {
    this.badgeVisible = false;
  }

  return {
    notifications,
    badgeVisible,
    listNotifications,
    createNotification,
    updateNotification,
    deleteNotificiation,

    clearAll,
    showBadge,
    hideBadge,
  };
});

// Enable HMR
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useNotificationsStore, import.meta.hot),
  );
}
