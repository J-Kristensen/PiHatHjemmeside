const baseUrl = "https://vendingmachinepihat.azurewebsites.net/api/accountings"
const userUrl = "https://vendingmachinepihat.azurewebsites.net/api/users"

Vue.createApp({
    data() {
        return {
            allAccountings: [],
            accountings: [], 
            allUsers: [],
            totalSum: 0,
        }
    },
    async created() {
        await this.getAll(baseUrl);
        await this.getAll(userUrl);
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
                console.error(ex.message);
            }
        },
        getUserName(userId) {
            const user = this.allUsers.find(user => user.id === userId);
            return user.firstName
        },
        async filterByName(firstName) {
            console.log("Filtering by name:", firstName);
        
            // Hvis søgefeltet er tomt, vis hele listen igen
            if (!firstName.trim()) {
                this.accountings = [...this.allAccountings];
                this.totalSum = this.sumOfAmount();
                return;
            }
        
            // Find brugeren baseret på fornavn
            const user = this.allUsers.find(user => user.firstName === firstName);
        
            if (user) {
                // Opdater data direkte for at sikre Vue.js reaktivitet
                this.accountings = this.allAccountings.filter(accounting => accounting.userId === user.id);
                console.log("Filtered accountings:", this.accountings);
        
                // Opdater summen kun når der er filtrede kontooplysninger
                this.totalSum = this.sumOfAmount();
            } else {
                // Håndter tilfælde, hvor brugeren ikke blev fundet
                console.warn("Bruger ikke fundet med navnet:", firstName);
        
                // Nulstil data, da der ikke er nogen bruger
                this.accountings = [];
                this.totalSum = 0; // Nulstil totalSum, når der ikke er nogen filtrede kontooplysninger
            }
        },
        sumOfAmount() {
            // Brug de filtrerede kontooplysninger i stedet for alle kontooplysninger
            const totalAmount = this.accountings.reduce((accumulator, accounting) => {
                return accumulator + accounting.amount;
            }, 0);
        
            // Opdater totalSum direkte
            this.totalSum = totalAmount;
            console.log("Sum of Prices: ", totalAmount);
        },
        getDate(date) {
            return new Date(date).toLocaleDateString();
        }         
    },
}).mount("#app");
