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