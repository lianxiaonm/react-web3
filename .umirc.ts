import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/http", component: "http" },
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
    { path: "/file", component: "files" },
    { path: "/*", component: "404" },
  ],
  mfsu: {
    mfName: "mf",
    strategy: "normal",
    exclude: [/spark\-md5/],
  },
  npmClient: "pnpm",
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
});
