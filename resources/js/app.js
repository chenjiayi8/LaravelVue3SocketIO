require("./bootstrap");

import { createApp } from "vue";
import ChatComponent from "./components/ChatComponent.vue";
import Echo from "laravel-echo";

window.io = require("socket.io-client");
window.Echo = new Echo({
    broadcaster: "socket.io",
    host: window.location.hostname + ":6001", // the host of your Laravel Echo server
});

createApp({
    components: {
        ChatComponent,
    },
}).mount("#app");
