const baseUrl = "https://vendingmachinepihat.azurewebsites.net/api/users";

Vue.createApp({
    data() {
        return {
            addData: { firstName: "", lastName: "", email: "", mobileNumber: "" }
        }
    },
    methods: {
        async addUser() {
            try {
                const response = await axios.post(baseUrl, this.addData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // Handle specific error scenarios based on API response
                if (response.status === 201) {
                    alert("Bruger oprettet, du vil få en sms med din adgangskode");
                } else if (response.status === 400) {
                    // Check if the response data contains error messages
                    if (response.data.includes("Phone number already exists")) {
                        alert("Telefonnummer eksisterer allerede");
                    } else if (response.data.includes("Email already exists")) {
                        alert("Email eksisterer allerede");
                    } else {
                        alert("Ukendt fejl: " + response.data);
                    }
                } else {
                    alert("Ukendt fejl: " + response.data);
                }
            } catch (ex) {
                alert("Der er en fejl, prøv igen");
            }
        },
    }
}).mount("#app");