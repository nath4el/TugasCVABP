// Reveal animation saat scroll
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Active navbar link saat scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// AJAX Quote API - native XMLHttpRequest
function loadQuote() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://dummyjson.com/quotes/random", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      document.getElementById("quoteLoading").style.display = "none";

      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        document.getElementById("quoteText").textContent = '"' + data.quote + '"';
        document.getElementById("quoteAuthor").textContent = "- " + data.author;
      } else {
        document.getElementById("quoteText").textContent =
          "Gagal mengambil quote dari API.";
        document.getElementById("quoteAuthor").textContent = "";
      }
    }
  };

  xhr.send();
}

// AJAX GitHub API - native XMLHttpRequest
function loadGithubProfile() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.github.com/users/nath4el", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      document.getElementById("githubLoading").style.display = "none";

      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);

        document.getElementById("githubData").innerHTML = `
          <p><strong>Username:</strong> ${data.login}</p>
          <p><strong>Repository Publik:</strong> ${data.public_repos}</p>
          <p><strong>Followers:</strong> ${data.followers}</p>
          <p><strong>Profile GitHub:</strong> <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
        `;
      } else {
        document.getElementById("githubData").innerHTML = `
          <p>Gagal mengambil data GitHub dari API.</p>
        `;
      }
    }
  };

  xhr.send();
}

// Jalankan saat halaman selesai dimuat
window.onload = function () {
  loadQuote();
  loadGithubProfile();
};