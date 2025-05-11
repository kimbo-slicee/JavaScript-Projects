// ======== DOM ELEMENTS ========
const lengthSlider = document.querySelector(".pass-length input");
const passwordLengthValue = document.querySelector(".pass-length .details span");
const generatePasswordBtn = document.querySelector(".generate-btn");
const options = document.querySelectorAll(".options .option input");
const input = document.querySelector("input[type='text']");
const passIndicator = document.querySelector(".pass-indicator");
const copyIcon=document.querySelector(".input-box span");
const copyPopup = document.querySelector(".copy-wrapper");
// ======== GLOBAL VARIABLES ========
let excludeDuplicate = false;
let checkedBoxes = 0;

// Character sets for different password options
const characters = {
   Lowercase: "abcdefghijklmnopqrstuvwxyz",
   Uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
   Numbers: "0123456789",
   Symbols: "!@#$%^&*(){}[]<>/|?;'\":"
};

// ======== EVENT LISTENERS FOR CHECKBOXES (added once) ========
options.forEach(option => {
   option.addEventListener("change", generatePassword);
});

// ======== UPDATE SLIDER UI AND GENERATE PASSWORD ========
const updateSlide = () => {
   passwordLengthValue.innerText = lengthSlider.value;
   generatePassword();
};

// ======== RANDOM PASSWORD GENERATION FUNCTION ========
const randomPass = (password) => {
   let randomPassword = "";
   const passLength = lengthSlider.value;
   for (let i = 0; i < passLength; i++) {
      let randomChar = password[Math.floor(Math.random() * password.length)];
      if (excludeDuplicate) {
         // Prevent duplicate characters (except spaces)
         if (!randomPassword.includes(randomChar) || randomChar === " ") {
            randomPassword += randomChar;
         } else {
            // rollBack the index if its duplicate char
            i--;
         }
      } else {
         randomPassword += randomChar;
      }
   }
   return randomPassword;
};

// ======== MAIN PASSWORD GENERATOR FUNCTION ========
function generatePassword() {
   let staticPassword = "";
   checkedBoxes = 0; // Reset checked boxes count each time
   excludeDuplicate = false; // Reset duplicate flag each time

   options.forEach((option) => {
      if (option.checked) {
         checkedBoxes++;
         if (option.id !== "exc-duplicate" && option.id !== "spaces") {
            // Add selected character sets to the static password base
            staticPassword += characters[option.id];
         } else if (option.id === "spaces") {
            // Add spaces around the characters
            staticPassword += ` ${staticPassword} `;
         } else {
            // Mark to exclude duplicates
            excludeDuplicate = true;
         }
      }
   });

   // Generate and display the random password
   input.value = randomPass(staticPassword);

   // Update strength indicator background
   changePassIndicatorBg();
};

// ======== CHANGE PASSWORD STRENGTH INDICATOR ========
const changePassIndicatorBg = () => {
   const length = parseInt(lengthSlider.value);
   const boxCount = checkedBoxes;
   // Scoring system based on length and character variety
   let score = 0;
   if (length > 5) score++;
   if (length > 10) score++;
   if (boxCount >= 3) score++;
   if (boxCount >= 4 && length > 15) score++;

   const level = score===0?1:score
   updateStrength(level);
};

// ======== APPLY STRENGTH CLASS TO INDICATOR ========
function updateStrength(level) {
   const strengthClasses = ['strength-1', 'strength-2', 'strength-3', 'strength-4'];
   passIndicator.classList.remove(...strengthClasses);
   if (level > 0 && level <= 4) {
      passIndicator.classList.add(`strength-${level}`);
   }
}

// ======== INITIALIZATION ========
updateSlide(); // Set initial length and password
lengthSlider.addEventListener("input", updateSlide); // React to slider changes
generatePasswordBtn.addEventListener("click", generatePassword); // Generate on button click
copyIcon.addEventListener("click", () => {
   const password = input.value;

   if (!password) return; // Do nothing if input is empty

   // Copy to clipboard using Clipboard API
   navigator.clipboard.writeText(password)
       .then(() => {
          // Optional: show tooltip or change icon temporarily
          copyPopup.classList.add("show")
          // You can also show a temporary message
          copyIcon.setAttribute("title", "Copied!");
          // Reset title after a second
          setTimeout(() => {
             copyPopup.classList.remove("show")
          }, 1000);
       })
       .catch((err) => {
          console.error("Failed to copy password:", err);
       });
});
