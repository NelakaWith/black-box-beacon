// 1. Assets (Injects TW4 styles into whatever app imports this)
import "./assets/index.css";

// 2. Logic & Utilities (The 'cn' function for merging classes)
export * from "./lib/utils";

// 3. UI Primitives (Shadcn components you 'added' via CLI)
export { default as Button } from "./components/ui/button/Button.vue";
