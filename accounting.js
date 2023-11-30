const baseUrl = "https://vendingmachinepihat.azurewebsites.net/api/accountings"

Vue.createApp({
    data() {
        return {
            allAccountings: [],
        }
    },
    async created() {
        this.getAll(baseUrl)
    },
    methods: {
        async getAll(url) {
            try {
                const response = await axios.get(url)
                this.allAccountings = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
    }

}).mount("#app")


