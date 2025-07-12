// profile.js
document.getElementById('profileUpload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      document.getElementById('profileDisplay').src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Country-State-City Dropdown Handling
const countries = {
  "India": {
    "Maharashtra": ["Mumbai", "Pune"],
    "Delhi": ["New Delhi"]
  },
  "USA": {
    "California": ["Los Angeles", "San Francisco"],
    "Texas": ["Houston", "Austin"]
  }
};

const countrySelect = document.getElementById("country");
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");

function populateDropdown(select, values) {
  select.innerHTML = '<option disabled selected>Select</option>';
  values.forEach(value => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = value;
    select.appendChild(opt);
  });
}

populateDropdown(countrySelect, Object.keys(countries));

countrySelect.addEventListener("change", () => {
  const states = Object.keys(countries[countrySelect.value]);
  populateDropdown(stateSelect, states);
  citySelect.innerHTML = '';
});

stateSelect.addEventListener("change", () => {
  const cities = countries[countrySelect.value][stateSelect.value];
  populateDropdown(citySelect, cities);
});

// Tag Input System
function initTagInput(containerId, predefinedTags) {
  const container = document.getElementById(containerId);
  const input = document.createElement("input");
  input.placeholder = "Add a skill...";
  container.appendChild(input);

  const tagSet = new Set();

  function addTag(tag) {
    if (!tagSet.has(tag) && tag) {
      tagSet.add(tag);
      const span = document.createElement("span");
      span.className = "tag";
      span.innerHTML = `${tag} <span>&times;</span>`;
      container.insertBefore(span, input);
      span.querySelector("span").addEventListener("click", () => {
        container.removeChild(span);
        tagSet.delete(tag);
      });
    }
    input.value = "";
  }

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input.value.trim());
    }
  });

  // Autocomplete Suggestions
  const suggestions = document.createElement("div");
  suggestions.className = "suggestion-box";
  predefinedTags.forEach(tag => {
    const sug = document.createElement("div");
    sug.className = "suggestion";
    sug.textContent = tag;
    sug.addEventListener("click", () => addTag(tag));
    suggestions.appendChild(sug);
  });
  container.appendChild(suggestions);
}

const skillOptions = [
  "JavaScript", "SQL", "Photoshop", "Data Structures",
  "Public Speaking", "Excel", "Web Design", "Teamwork",
  "Python", "Spring Boot", "Communication", "Creative Problem Solving"
];

initTagInput("skillsOffered", skillOptions);
initTagInput("skillsWanted", skillOptions);
function showToastAndRedirect() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
    window.location.href = "homepage1.html";
  }, 2000); // Wait 2 seconds before redirect
}

document.querySelector('.btn.save').addEventListener('click', async (e) => {
  e.preventDefault();

  // ✅ Collect user data from form fields
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const contact = document.getElementById('contact').value.trim();
  const country = document.getElementById('country').value;
  const state = document.getElementById('state').value;
  const city = document.getElementById('city').value;

  const skillsOffered = Array.from(document.querySelectorAll('#skillsOffered .tag')).map(tag => tag.textContent.replace('×', '').trim());
  const skillsWanted = Array.from(document.querySelectorAll('#skillsWanted .tag')).map(tag => tag.textContent.replace('×', '').trim());

  const auth = firebase.auth();
  const db = firebase.firestore();

  const user = auth.currentUser;
  if (!user) {
    alert("User not logged in.");
    return;
  }

  try {
    await db.collection("users").doc(user.uid).update({
      firstName,
      lastName,
      contact,
      country,
      state,
      city,
      skillsOffered,
      skillsWanted
    });

    // ✅ Redirect after successful save
    window.location.href = "homepage.html";
  } catch (error) {
    console.error("Error saving profile:", error);
    alert("Failed to save profile.");
  }
});

document.querySelector('.btn.discard').addEventListener('click', () => {
  window.location.reload(); // or window.location.href = 'homepage.html';
});
