const axios = require('axios');
const {config} = require('./src/config/config');

const tinybird_token = config.TINYBIRD_API_TOKEN;
const tinybird_sql_endpoint = "https://api.tinybird.co/v0/sql";

async function diagnosticTest() {
  const phoneNumber = '+19714144648';
  
  console.log(`\n🔍 Diagnostic Test for phone number: ${phoneNumber}\n`);
  
  const url = tinybird_sql_endpoint;
  const headers = {
    Authorization: `Bearer ${tinybird_token}`,
    'Content-Type': 'application/json'
  };
  
  const query = `
    SELECT * FROM call_ai_agent_mobile_number_twilio t
    LEFT JOIN call_agent_ai a ON t.call_ai_agent_id = a.agent_uid
    LEFT JOIN organization_and_individual o ON o.organization_unique_id = a.org_uid
    WHERE t.twilio_phone_no = '${phoneNumber}' FORMAT JSON
  `;
  
  const params = new URLSearchParams({q: query.trim()});
  
  try {
    console.log('📤 Sending query to Tinybird...\n');
    const response = await axios.get(url, {headers, params, timeout: 5000});
    
    console.log('✅ Response received from Tinybird\n');
    console.log('Response status:', response.status);
    console.log('\n📊 Full Response Data:');
    console.log(JSON.stringify(response.data, null, 2));
    
    if (response.data.data && response.data.data.length > 0) {
      console.log('\n📋 First Record Details:');
      const record = response.data.data[0];
      Object.keys(record).forEach(key => {
        console.log(`  ${key}: ${record[key]}`);
      });
    } else {
      console.log('\n⚠️ No records found for this phone number');
    }
    
  } catch (error) {
    console.error(`\n❌ Error fetching data from Tinybird:`);
    if (error.response) {
      console.error(`HTTP Status: ${error.response.status}`);
      console.error(`Response:`, error.response.data);
    } else {
      console.error(`Error: ${error.message}`);
    }
  }
}

diagnosticTest();
