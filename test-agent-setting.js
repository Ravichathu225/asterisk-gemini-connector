const { AgentSetting } = require('./src/agent-setting');

async function testAgentSetting() {
  const phoneNumber = '+19714144648';
  
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`🧪 TESTING AGENT SETTINGS`);
  console.log(`Phone Number: ${phoneNumber}`);
  console.log(`${'═'.repeat(70)}\n`);
  
  try {
    const agentData = new AgentSetting(phoneNumber);
    console.log(`✓ AgentSetting instance created\n`);
    
    console.log(`📡 Fetching agent settings from Tinybird...\n`);
    await agentData._fetchAgentSettings();
    
    console.log(`\n${'═'.repeat(70)}`);
    console.log(`✅ AGENT SETTINGS SUCCESSFULLY RETRIEVED`);
    console.log(`${'═'.repeat(70)}\n`);
    
    console.log('📋 CORE CONFIGURATION:');
    console.log(`  Phone Number:        ${agentData.phoneNumber}`);
    console.log(`  Agent Name:          ${agentData.name}`);
    console.log(`  Agent ID:            ${agentData.agentId}`);
    console.log(`  Organization UID:    ${agentData.orgUid}`);
    console.log(`  Organization Name:   ${agentData.orgUid}`);
    
    console.log('\n🔊 VOICE & LANGUAGE SETTINGS:');
    console.log(`  Voice:               ${agentData.voice}`);
    console.log(`  LLM Model:           ${agentData.generateResponseModel}`);
    console.log(`  First Sentence:      ${agentData.firstSentence}`);
    console.log(`  Temperature:         ${agentData.temperature}`);
    console.log(`  Max Tokens:          ${agentData.maxTokens}`);
    
    console.log('\n📞 TWILIO CONFIGURATION:');
    console.log(`  Twilio Account SID:  ${agentData.twilioAccountId}`);
    console.log(`  Twilio Token:        ${agentData.twilioAccountToken ? '✓ Set' : '✗ Not set'}`);
    
    console.log('\n💾 KNOWLEDGE & DOCUMENTS:');
    console.log(`  Knowledge Base:      ${agentData.documentData}`);
    
    console.log('\n💰 BILLING INFORMATION:');
    console.log(`  Account Balance:     $${agentData.accountBalance}`);
    console.log(`  Cost Per Call:       $${agentData.costOfCall}`);
    
    console.log('\n🎯 ADDITIONAL SETTINGS:');
    console.log(`  User ID:             ${agentData.userId}`);
    console.log(`  Transfer Number:     ${agentData.transferNumber || 'Not configured'}`);
    console.log(`  Otrix Main Prompt:   ${agentData.otrixMainPrompt ? '✓ Set' : '✗ Not set'}`);
    
    console.log('\n📝 AGENT PROMPT (First 200 chars):');
    console.log(`  ${agentData.prompt ? agentData.prompt.substring(0, 200) + '...' : 'N/A'}`);
    
    console.log(`\n${'═'.repeat(70)}`);
    console.log(`✨ TEST COMPLETED SUCCESSFULLY`);
    console.log(`${'═'.repeat(70)}\n`);
    
  } catch (err) {
    console.error(`\n${'═'.repeat(70)}`);
    console.error(`❌ ERROR OCCURRED`);
    console.error(`${'═'.repeat(70)}`);
    console.error(`\nError Message: ${err.message}\n`);
    if (err.response) {
      console.error(`HTTP Status: ${err.response.status}`);
      console.error(`Response Data:`, err.response.data);
    }
    console.error(`\n${'═'.repeat(70)}\n`);
    process.exit(1);
  }
}

testAgentSetting();
