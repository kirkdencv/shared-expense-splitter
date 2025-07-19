const axios = require('axios');

const checkHealth = async () => {
    try {
        const response = await axios.get('http://localhost:3000/health');
        console.log('✅ Server healthy:', response.data);
    } catch (error) {
        console.log('❌ Server unhealthy:', error.message);
    }
};

// Check every 30 seconds
setInterval(checkHealth, 30000);
console.log('🔍 Health monitor started...');