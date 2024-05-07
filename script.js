const userInputBox = document.getElementById("userInput");
const submitButton = document.getElementById("submitButton");
const resultsArea = document.getElementById("results");

submitButton.addEventListener("click", async () => {
  const userInput = userInputBox.value;

  // Replace with your serverless function URL (including path)
  const url = "YOUR_SERVERLESS_FUNCTION_URL";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();

  if (data.error) {
    console.error(data.error);
    alert("Error generating text. Please try again later.");
  } else {
    resultsArea.textContent = data.generatedText;
  }
});
