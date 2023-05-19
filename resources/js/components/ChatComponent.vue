<template>
    <div>
        <div v-for="message in messages" :key="message.id">
            {{ message.body }}
        </div>

        <input type="text" v-model="newMessage" @keyup.enter="sendMessage" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            messages: [],
            newMessage: "",
        };
    },
    methods: {
        sendMessage() {
            axios.post("/api/messages", { body: this.newMessage }).then(() => {
                this.newMessage = "";
            });
        },
    },
    mounted() {
        axios.get("/api/messages").then((response) => {
            this.messages = response.data;
        });

        window.Echo.channel("chat").listen(".MessageSent", (e) => {
            this.messages.push(e.message);
        });
    },
};
</script>
