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

        window.Echo.channel("laravel_database_chat").listen(
            ".message.sent",
            (data) => {
                this.messages.push(data.message);
            }
        );
    },

    beforeDestroy() {
        window.Echo.leaveChannel("laravel_database_chat");
    },
};
</script>
