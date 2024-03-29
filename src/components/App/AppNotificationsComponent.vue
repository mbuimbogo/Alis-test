<script setup lang="ts">
  // Vue & Store imports
  import { storeToRefs } from 'pinia';
  import { useNotificationsStore } from '../../stores/NotificationsStore';
  import { notificationState } from '../../constants/enums';

  import { FormatDate } from '../../utils/utils';
  import { onMounted } from 'vue';

  // Define store
  const notificationsStore = useNotificationsStore();

  // storeTorefs
  var { notifications, badgeVisible } = storeToRefs(notificationsStore);
</script>

<template>
  <v-btn
    variant="flat"
    icon
    color="background"
    @click="badgeVisible = false"
  >
    <template v-if="badgeVisible">
      <v-badge
        color="red"
        dot
      >
        <v-icon
          color="grey-darken-2"
          size="large"
          >notifications_outlined</v-icon
        >
      </v-badge>
    </template>
    <template v-else>
      <v-icon
        color="grey-darken-2"
        size="large"
        >notifications_outlined</v-icon
      >
    </template>

    <v-menu
      activator="parent"
      :close-on-content-click="false"
    >
      <v-card
        width="450"
        height="400"
      >
        <v-card-title>Notifications</v-card-title>
        <v-card-text class="text-center overflow-y-auto">
          <div
            class="mt-4"
            v-if="notifications.length === 0"
          >
            No New notifications
          </div>
          <v-card
            v-for="notification in notifications"
            :key="notification.getName()"
            class="bg-background my-2"
            height="100"
          >
            <v-row
              no-gutters
              class="pt-2 h-100"
            >
              <v-col
                cols="1"
                class="ml-2 mt-1"
              >
                <template v-if="notification.getState() === 4">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    size="small"
                  ></v-progress-circular>
                </template>
                <template v-else>
                  <v-icon
                    class="mt-2"
                    :color="notificationState[notification.getState()].color"
                    size="22"
                  >
                    {{ notificationState[notification.getState()].icon }}
                  </v-icon>
                </template>
              </v-col>
              <v-col
                cols="10"
                class="text-start ml-2 mt-1"
              >
                <v-card-title class="pa-0 d-flex justify-space-between">
                  {{ notification.getTitle() }}
                </v-card-title>
                <v-card-subtitle class="pa-0 text-wrap">
                  {{ notification.getSubtitle() }}
                </v-card-subtitle>
                <v-card-text class="d-flex justify-end pa-0">
                  <div class="font-italic text-caption mt-2 text-grey">
                    {{ FormatDate(notification.getUpdateTime()) }}
                  </div>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-btn>
</template>
