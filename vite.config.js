import { defineConfig } from "vite";
import { handlebars } from "./plugins/handlebars";
import svgr from "vite-plugin-svgr";


export default defineConfig({
    plugins: [handlebars()],
    plugins: [svgr()],
});
