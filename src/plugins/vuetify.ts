// Styles
import 'vuetify/styles';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

// Vuetify
import { createVuetify } from 'vuetify';
import type { ThemeDefinition } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, md } from 'vuetify/iconsets/md';
import { md3 } from 'vuetify/blueprints';
import { VCard } from 'vuetify/components/VCard';

// Material Design 3
//
// Since Vuetify 3 is lacking some of the md3 specifications,
// this section of imports aims to align it.
// Once the changes are implemented, these can be removed.
import '../assets/md3-typography.css'; // Override for md3 typography

const alisLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    // Default colors
    anchor: '#000000',
    primary: '#006383',
    secondary: '#F02222',
    tertiary: '#C5E4CE',
    petrol: '27323A',
    cyan: '#006383',
    green: '#C5E4CE',

    // Container colors
    background: '#f8fafd',
    surface: '#FFFFFF',

    // State colors
    error: '#F02222',
    running: '#199f19',
    failure: '#B00020',
    cancel: '#F02222',

    // On colors
    onPrimary: '#FFFFFF',
    'onPrimary--high': '#E0E0E0',
    'onPrimary--medium': '#A0A0A0',
    'onPrimary--disabled': '#6C6C6C',
    onBackground: '#777777',
    onSurface: '',
    'onSurface--high': '#000000',
    'onSurface--medium': '#000000',
    'onSurface--disabled': '#000000',
    onError: '#FFFFFF',

    // Google Slides Theme Colours
    'searchbar-bg': '#e9eef6',
    'background-blue': '#F4F9F9',
    'card-blue': '#E7F1F6', // Flat card blue colour
    'google-docs-blue': '#f8fafd',
  },
};

export default createVuetify({
  aliases: {
    VCardOutlined: VCard,
  },
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
    },
  },
  theme: {
    defaultTheme: 'alisLightTheme',
    themes: {
      alisLightTheme,
    },
  },
  defaults: {
    VAppBar: {
      color: 'background',
    },
    VNavigationDrawer: {
      VList: {
        class: ['justify-content-center', 'px-0'],
        nav: true,
      },
      VListItem: {
        class: ['text-center', 'text-petrol', 'text-label'],
      },
      VBtn: {
        class: ['px-2', 'my-1'],
        VIcon: {
          color: 'petrol',
        },
      },
    },
    VBtn: {
      color: 'primary',
      variant: 'tonal',
    },
    VTextField: {
      variant: 'outlined',
      density: 'compact',
      color: 'primary',
    },
    VSelect: {
      variant: 'outlined',
      density: 'compact',
      color: 'primary',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'compact',
      color: 'primary',
    },
    VAutocomplete: {
      variant: 'outlined',
      density: 'compact',
      color: 'primary',
    },
    VCardOutlined: {
      variant: 'outlined',
      style: ['border: 1px solid #e1e3e1;'],
    },
    VIcon: {
      size: 20,
    },
    VProgressCircular: {
      size: 45,
    },
    VTable: {
      density: 'comfortable',

      VChip: {
        size: 'small',

        VIcon: {
          size: '16',
        },
      },
      VAvatar: {
        size: 'small',
      },
    },
    VDataTableVirtual: {
      density: 'comfortable',

      VChip: {
        size: 'small',

        VIcon: {
          size: '16',
        },
      },
      VAvatar: {
        size: 'small',
      },
      VBtn: {
        size: `small`,
        VIcon: {
          size: '16',
        },
      },
    },
    VTooltip: {
      location: 'bottom',
      openDelay: '200',
      maxWidth: '240',
    },
  },
  blueprint: md3,
  components: { ...components },
  directives,
});
