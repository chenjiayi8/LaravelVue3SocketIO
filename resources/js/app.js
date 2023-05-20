require("./bootstrap");

import { createApp } from "vue";
import ChatComponent from "./components/ChatComponent.vue";

createApp({
    components: {
        ChatComponent,
    },
}).mount("#app");
