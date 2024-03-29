import { defineStore, acceptHMRUpdate } from 'pinia';
import { type Ref, ref } from 'vue';

// Constants for snackbar types
export const SNACKBAR_TYPE_SUCCESS = 'SUCCESS';
export const SNACKBAR_TYPE_INFO = 'INFO';
export const SNACKBAR_TYPE_WARNING = 'WARNING';
export const SNACKBAR_TYPE_ERROR = 'ERROR';

const STORE_ID = 'snackbar';

export const useSnackbarStore = defineStore(STORE_ID, () => {
  // Ref

  const showSnackbar: Ref<boolean> = ref(false);
  const snackbarColor: Ref<string> = ref('');
  const snackbarIcon: Ref<string> = ref('string');
  const snackbarMessage: Ref<string> = ref('Info Message');
  const snackbarType: Ref<Record<string, Record<string, string>>> = ref({
    [SNACKBAR_TYPE_SUCCESS]: {
      color: 'green-darken-3',
      icon: 'check_circle',
    },
    [SNACKBAR_TYPE_INFO]: {
      color: 'primary',
      icon: 'info',
    },
    [SNACKBAR_TYPE_WARNING]: {
      color: 'yellow-darken-4',
      icon: 'warning',
    },
    [SNACKBAR_TYPE_ERROR]: {
      color: 'red',
      icon: 'error',
    },
  });

  // Functions

  function toggleSnackbar(type: string, message: string) {
    // Set snackbar color
    this.snackbarColor = this.snackbarType[type].color;
    // Set snackbar color
    this.snackbarIcon = this.snackbarType[type].icon;
    // Set snackbar message
    this.snackbarMessage = message;
    // Show snackbar
    this.showSnackbar = !this.showSnackbar;
  }

  return {
    showSnackbar,
    snackbarColor,
    snackbarIcon,
    snackbarMessage,
    snackbarType,
    toggleSnackbar,
  };
});

// Enable HMR
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSnackbarStore, import.meta.hot));
}
