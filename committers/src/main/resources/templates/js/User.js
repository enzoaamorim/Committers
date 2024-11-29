class User {
    constructor() {
        this.userData = this.loadUserData();
    }

    // Save user personal data
    savePersonalData(personalInfo) {
        // Validate input
        if (!personalInfo || typeof personalInfo !== 'object') {
            throw new Error('Invalid personal information');
        }

        // Merge with existing data to preserve previous entries
        this.userData = {
            ...this.userData,
            personalData: {
                ...this.userData.personalData,
                ...personalInfo
            }
        };

        this.saveToLocalStorage();
    }

    // Save delivery address
    saveDeliveryAddress(addressInfo) {
        if (!addressInfo || typeof addressInfo !== 'object') {
            throw new Error('Invalid address information');
        }

        this.userData = {
            ...this.userData,
            deliveryAddress: {
                ...this.userData.deliveryAddress,
                ...addressInfo
            }
        };

        this.saveToLocalStorage();
        
    }

    // Save billing address
    saveBillingAddress(addressInfo) {
        if (!addressInfo || typeof addressInfo !== 'object') {
            throw new Error('Invalid address information');
        }

        this.userData = {
            ...this.userData,
            billingAddress: {
                ...this.userData.billingAddress,
                ...addressInfo
            }
        };

        this.saveToLocalStorage();
    }

    // Load user data from localStorage
    loadUserData() {
        const savedData = localStorage.getItem('userData');
        return savedData ? JSON.parse(savedData) : {
            personalData: {},
            deliveryAddress: {},
            billingAddress: {}
        };
    }

    // Save current user data to localStorage
    saveToLocalStorage() {
        try {
            localStorage.setItem('userData', JSON.stringify(this.userData));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    // Get specific user data
    getUserData(section = null) {
        if (!section) return this.userData;

        const validSections = ['personalData', 'deliveryAddress', 'billingAddress'];
        if (!validSections.includes(section)) {
            throw new Error('Invalid section');
        }

        return this.userData[section] || {};
    }

    // Clear all user data
    clearUserData() {
        this.userData = {
            personalData: {},
            deliveryAddress: {},
            billingAddress: {}
        };
        this.saveToLocalStorage();
    }

    // Check if a specific section has data
    hasData(section) {
        const data = this.getUserData(section);
        return Object.keys(data).length > 0;
    }
}

// Export the User class for use in other modules
export default User;