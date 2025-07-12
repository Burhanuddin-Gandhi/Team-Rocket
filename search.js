import { db } from './firebase.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const resultsDiv = document.getElementById("results");
let allProfiles = [];

function renderProfiles(filtered) {
  resultsDiv.innerHTML = filtered.map(user => `
    <div class="bg-white p-4 rounded shadow">
      <h4 class="font-bold text-lg">${user.name}</h4>
      <p><strong>Skills Offered:</strong> ${user.skillsOffered?.join(', ')}</p>
      <p><strong>Skills Wanted:</strong> ${user.skillsWanted?.join(', ')}</p>
      <p><strong>Availability:</strong> ${user.availability?.join(', ')}</p>
    </div>
  `).join('');
}

// Real-time fetch all profiles
onSnapshot(collection(db, "users"), snapshot => {
  allProfiles = snapshot.docs.map(doc => doc.data());
  renderProfiles(allProfiles); // Default: show all
});

window.searchProfiles = function () {
  const query = document.getElementById("searchInput").value.toLowerCase();

  // Get selected filters
  const selectedAvailability = Array.from(document.querySelectorAll('.availability:checked')).map(cb => cb.value);
  const selectedSkillsOffered = Array.from(document.querySelectorAll('.skills-offered:checked')).map(cb => cb.value);
  const selectedSkillsWanted = Array.from(document.querySelectorAll('.skills-wanted:checked')).map(cb => cb.value);

  const filtered = allProfiles.filter(user => {
    const nameMatch = user.name.toLowerCase().includes(query);
    const skillMatch =
      user.skillsOffered?.some(skill => skill.toLowerCase().includes(query)) ||
      user.skillsWanted?.some(skill => skill.toLowerCase().includes(query));

    const availabilityMatch = selectedAvailability.length === 0 ||
      user.availability?.some(a => selectedAvailability.includes(a));

    const offeredMatch = selectedSkillsOffered.length === 0 ||
      user.skillsOffered?.some(s => selectedSkillsOffered.includes(s));

    const wantedMatch = selectedSkillsWanted.length === 0 ||
      user.skillsWanted?.some(s => selectedSkillsWanted.includes(s));

    return (nameMatch || skillMatch) && availabilityMatch && offeredMatch && wantedMatch;
  });

  renderProfiles(filtered);
};

async function searchProfiles() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  const q = query(collection(db, "users")); // You can later add filters here

  const querySnapshot = await getDocs(q);
  const results = [];

  querySnapshot.forEach(doc => {
    const data = doc.data();

    const matchesSearch = data.name.toLowerCase().includes(searchTerm)
      || data.skillsOffered.some(skill => skill.includes(searchTerm))
      || data.skillsWanted.some(skill => skill.includes(searchTerm));

    if (matchesSearch) results.push(data);
  });

  // Display results
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = results.map(user => `
    <div class="bg-white p-4 rounded shadow">
      <h4 class="font-bold text-lg">${user.name}</h4>
      <p><strong>Skills Offered:</strong> ${user.skillsOffered.join(', ')}</p>
      <p><strong>Skills Wanted:</strong> ${user.skillsWanted.join(', ')}</p>
      <p><strong>Availability:</strong> ${user.availability.join(', ')}</p>
    </div>
  `).join('');
}

window.searchProfiles = searchProfiles;
