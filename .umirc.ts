import { defineConfig } from "umi";

const env = process.env.NODE_ENV || "development";
console.log("env", env);

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/http", component: "http" },
    { path: "/file", component: "files" },
    {
      path: "/web3",
      component: "@/layouts/web3",
      routes: [
        { path: "", component: "web3" }, //
        { path: "/web3/market", component: "web3/market" }, //
        { path: "/web3/trade", component: "web3/trade" }, //
        { path: "/web3/discover", component: "web3/discover" }, //
        { path: "/web3/assets", component: "web3/assets" }, //
      ],
    },
    {
      path: "/code",
      component: "@/layouts/basic",
      routes: [
        { path: "", component: "code" }, //
        { path: "/code/run", component: "code/run" }, //
      ],
    },
    {
      path: "/canvas",
      component: "@/layouts/basic",
      routes: [
        { path: "", component: "canvas" }, //
        { path: "/canvas/run", component: "canvas/run" }, //
      ],
    },
    {
      path: "/chart",
      component: "@/layouts/basic",
      routes: [
        { path: "", component: "chart" }, //
        { path: "/chart/run", component: "chart/run" }, //
      ],
    },
    { path: "/*", component: "404" },
  ],
  mfsu: {
    mfName: "mf",
    strategy: "normal",
    exclude: [/spark\-md5/],
  },
  esbuildMinifyIIFE: true,
  jsMinifierOptions: {
    target: ["chrome80", "es2020"],
    drop: ["console", "debugger"],
  },
  npmClient: "pnpm",
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
});
