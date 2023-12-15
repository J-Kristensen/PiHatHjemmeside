const baseUrl = "https://vendingmachinepihat.azurewebsites.net/api/accountings";
const userUrl = "https://vendingmachinepihat.azurewebsites.net/api/users";

Vue.createApp({
    data() {
        return {
            allAccountings: [],
            accountings: [],
            allUsers: [],
            totalSum: 0,
            firstName: "", // Add firstName to data
        };
    },
    async created() {
        await Promise.all([this.getAll(baseUrl), this.getAll(userUrl)]);
    },
    methods: {
        async getAll(url) {
            try {
                const response = await axios.get(url);
                if (url === userUrl) {
                    this.allUsers = response.data;
                } else {
                    this.allAccountings = await response.data;
                    this.accountings = this.allAccountings;
                }
            } catch (ex) {
                console.error(`An error occurred while fetching data from ${url}: ${ex.message}`);
            }
        },
        getUserName(userId) {
            const user = this.allUsers.find(user => user.id === userId);
            return user ? user.firstName : "";
        },
        async filterByName(firstName) {
            console.log("Filtering by name:", firstName);

            if (!firstName.trim()) {
                this.accountings = [...this.allAccountings];
                this.totalSum = this.sumOfAmount();
                return;
            }

            const user = this.allUsers.find(user => user.firstName === firstName);

            if (user) {
                this.accountings = this.allAccountings.filter(accounting => accounting.userId === user.id);
                console.log("Filtered accountings:", this.accountings);
                this.totalSum = this.sumOfAmount();
            } else {
                console.warn("User not found with the name:", firstName);
                this.accountings = [];
                this.totalSum = 0;
            }
        },
        sumOfAmount() {
            const totalAmount = this.accountings.reduce((accumulator, accounting) => {
                return accumulator + accounting.amount;
            }, 0);

            this.totalSum = totalAmount.toLocaleString("da-DK", { style: "currency", currency: "DKK" });
            console.log("Sum of Prices:", this.totalSum);
        },
        getDate(date) {
            return new Date(date).toLocaleDateString();
        }
    },
}).mount("#app");