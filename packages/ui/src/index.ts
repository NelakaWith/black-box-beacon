import { type App } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import Card from "primevue/card";

import "./assets/index.css";

import { definePreset } from "@primevue/themes";

const BlackBoxPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "var(--color-beacon-50)",
      100: "var(--color-beacon-100)",
      200: "var(--color-beacon-200)",
      300: "var(--color-beacon-300)",
      400: "var(--color-beacon-400)",
      500: "var(--color-beacon-500)",
      600: "var(--color-beacon-600)",
      700: "var(--color-beacon-700)",
      800: "var(--color-beacon-800)",
      900: "var(--color-beacon-900)",
      950: "var(--color-beacon-950)",
    },
    colorScheme: {
      light: {
        surface: {
          0: "#ffffff",
          50: "{zinc.50}",
          100: "{zinc.100}",
          200: "{zinc.200}",
          300: "{zinc.300}",
          400: "{zinc.400}",
          500: "{zinc.500}",
          600: "{zinc.600}",
          700: "{zinc.700}",
          800: "{zinc.800}",
          900: "{zinc.900}",
          950: "{zinc.950}",
        },
      },
      dark: {
        surface: {
          0: "#ffffff",
          50: "{zinc.50}",
          100: "{zinc.100}",
          200: "{zinc.200}",
          300: "{zinc.300}",
          400: "{zinc.400}",
          500: "{zinc.500}",
          600: "{zinc.600}",
          700: "{zinc.700}",
          800: "{zinc.800}",
          900: "{zinc.900}",
          950: "{zinc.950}",
        },
      },
    },
  },
  components: {
    global: {
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem'
      }
    },
    inputtext: {
      style: {
         root: {
            fontFamily: 'var(--font-mono)',
            borderRadius: '{borderRadius.sm}'
         }
      }
    },
    textarea: {
      style: {
        root: {
          fontFamily: 'var(--font-mono)',
          borderRadius: '{borderRadius.sm}'
        }
      }
    },
    button: {
      style: {
        root: {
          borderRadius: '{borderRadius.sm}'
        }
      }
    },
    card: {
      style: {
        root: {
          borderRadius: '{borderRadius.sm}'
        }
      }
    }
  }
});

export const BlackBoxUI = {
  install(app: App) {
    app.use(PrimeVue, {
      theme: {
        preset: BlackBoxPreset,
        options: {
          darkModeSelector: ".dark",
        },
      },
    });

    app.component("Button", Button);
    app.component("Textarea", Textarea);
    app.component("Card", Card);
  },
};

export { Button };
export { Textarea };
export { Card };
