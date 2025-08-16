/**
 * PostCSS pipeline for the Illustrator CEP panel
 *
 * Tailwind 4/shadcn generate CSS that relies on modern browser features (cascade layers, oklch(), color-mix(), etc.). The CEP runtime in Illustrator 2024 is Chromium 88, which doesn’t understand those features and silently ignores the rules.
 *
 * We therefore run the compiled Tailwind output through a set of CSSTools polyfills that:
 *   • flatten @layer blocks                                  →  Chrome 88 can read the rules
 *   • convert oklch()/lab() + color-mix()                    →  static sRGB colors
 *   • add missing prefixes / CSS candidate stage-3 features  →  via postcss-preset-env
 *
 * Result: one CSS file that old Chromium accepts, letting the panel display Tailwind/shadcn styles without downgrading the design system or moving away from CEP.
 */

import cascadeLayers from "@csstools/postcss-cascade-layers";
import oklabFunction from "@csstools/postcss-oklab-function";
import colorMixFunction from "@csstools/postcss-color-mix-function";
import postcssPresetEnv from "postcss-preset-env";

export default {
  plugins: [
    cascadeLayers({ preserve: false }),
    oklabFunction({ preserve: false }),
    colorMixFunction({ preserve: false }),
    postcssPresetEnv({
      browsers: "chrome 88",
      stage: 3,
    }),
  ],
};
