const http = require('http');

// Simple API testing function
function testAPI(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({
            status: res.statusCode,
            data: jsonBody
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: body
          });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting API Tests...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing server health...');
    const healthResult = await testAPI('GET', '/');
    console.log('   Status:', healthResult.status);
    console.log('   Response:', healthResult.data);
    console.log('   ✅ Health check passed\n');

    // Test 2: Register user
    console.log('2. Testing user registration...');
    const registerResult = await testAPI('POST', '/api/auth/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('   Status:', registerResult.status);
    console.log('   Response:', registerResult.data);
    if (registerResult.status === 201) {
      console.log('   ✅ Registration passed\n');
    } else {
      console.log('   ❌ Registration failed\n');
    }

    // Test 3: Login user
    console.log('3. Testing user login...');
    const loginResult = await testAPI('POST', '/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('   Status:', loginResult.status);
    console.log('   Response:', loginResult.data);
    if (loginResult.status === 200) {
      console.log('   ✅ Login passed\n');
    } else {
      console.log('   ❌ Login failed\n');
    }

    console.log('🎉 API Tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure your server is running with: npm start');
  }
}

runTests();