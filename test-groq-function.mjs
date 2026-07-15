// Test script to verify groq-proxy function
import fetch from 'node-fetch';

const testPrompt = {
  prompt: "Apa itu fotosintesis?"
};

console.log("Testing groq-proxy function with prompt:", testPrompt.prompt);

// Using fetch to test the deployed function
fetch("https://pnorvxmagvucopoxcshn.supabase.co/functions/v1/groq-proxy", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(testPrompt)
})
.then(response => response.json())
.then(data => {
  console.log("Response from groq-proxy:", data);
})
.catch(error => {
  console.error("Error calling groq-proxy:", error);
});