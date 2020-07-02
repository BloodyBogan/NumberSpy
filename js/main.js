// Get The 'Get Country' Button
const button = document.querySelector('.btn');
// Get The Input Field
const input = document.querySelector('.input');
// Get The Div With an ID Of Result
const resultContainer = document.getElementById('result');

// Time The Error Message Will Stay On For
const showMessageTime = 3000;

// Init Timeout Variable
let interval;

// Button Event Listener
// Fetch Return Promise, Hence Async
button.addEventListener('click', async (e) => {
  // Prevent The The Default Form Behaviour (Submitting)
  e.preventDefault();

  // Get The Input Field Value And Remove + Sign If Any
  const countryCode = input.value.replace(/\+/g, '');

  // Country Code FORMAT Regex
  const regex = /^(\+?\d{1,3}|\d{1,4})$/gm;
  // If The Input Value Doesn't Match The Regex, We Get Null
  const match = countryCode.match(regex);

  // Check If The Input Field Is Empty & The Field Input Matches The Regex
  if (countryCode !== '' && match !== null) {
    try {
      clearInterval(interval);
      interval = null;
      // Get Response From The API
      const response = await fetch(
        `https://restcountries.eu/rest/v2/callingcode/${countryCode}`
      );
      // Convert The Response Into JSON Format
      const country = await response.json();

      // Set The resultContainer innerHTML To The Result
      resultContainer.innerHTML = `
              <img src="https://www.countryflags.io/${country[0].alpha2Code.toLowerCase()}/flat/64.png" alt="${
        country[0].name
      } Flag Icon" />
            <div>
              <strong>Country Code: </strong>
              +${countryCode}
            </div>
            <div>
              <strong>Country: </strong>
              ${country[0].name}
            </div>
            `;

      clearInput();
    } catch (error) {
      clearInput();
      // Display Error Message When The Country Code Doesn't Exist
      displayMessage(resultContainer, 'Please enter a valid country code...');
    }
  } else {
    clearInput();
    // Display Error Message When The Input Isn't Country Code
    displayMessage(resultContainer, 'Please enter a country code...');
  }
});

// Function That Clears The Input Field And Focuses Back Into It
function clearInput() {
  input.value = '';
  input.focus();
}

// Handles Displaying The Error Message
function displayMessage(element, message) {
  element.innerHTML = `
  <div class="message-error">
    ${message}
  </div>
  `;

  interval = setTimeout(() => {
    element.innerHTML = '';
  }, showMessageTime);
}
