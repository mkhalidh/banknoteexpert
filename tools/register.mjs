// Registers the "@/..." alias resolve hook for standalone node scripts.
import { register } from "node:module";
register("./alias-hooks.mjs", import.meta.url);
