const baseUrl = "https://vendingmachinepihat.azurewebsites.net/api/users"

Vue.createApp({
    data() {
        return {
            firstName: null,
            lastName: null,
            email: null,
            mobileNumber: null,
            id: null,
            password: null,
            addData: { firstName: "", lastName: "", email: "", mobileNumber: ""}
        }
    },
    async created() {
    },
    methods: {
        async addUser() {
            try {
                response = await axios.post(baseUrl, this.addData)
            } catch (ex) {
                alert(ex.message)
            }
        },
    }
    
}).mount("#app") 


