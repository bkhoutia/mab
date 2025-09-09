document.addEventListener("DOMContentLoaded", () => {
  fetch("./assets/js/data/data.json")
    .then(res => res.json())
    .then(data => {
      loadProfile(data.profile);
      loadAbout(data.about);
      loadServices(data.services);
      loadResume(data.resume);
      loadSkills(data.skills);
      loadPortfolio(data.portfolio);
    })
    .catch(err => console.error("Error loading data:", err));
});

// 🟢 PROFILE
function loadProfile(profile) {
  document.querySelector(".avatar-box img").src = profile.avatar;
  document.querySelector(".name").textContent = profile.name;

  const titlesDiv = document.querySelector(".div-title");
  titlesDiv.innerHTML = "";
  profile.titles.forEach(title => {
    let p = document.createElement("p");
    p.className = "title";
    p.textContent = title;
    titlesDiv.appendChild(p);
  });

  // Contacts
  document.querySelector('[href^="mailto"]').textContent = profile.email;
  document.querySelector('[href^="mailto"]').href = "mailto:" + profile.email;

  document.querySelector('[href^="tel"]').textContent = profile.phone;
  document.querySelector('[href^="tel"]').href = "tel:" + profile.phone;

  document.querySelector("address").textContent = profile.location;

  // Socials
  const socials = document.querySelector(".social-list");
  socials.innerHTML = "";
  for (let key in profile.socials) {
    let li = document.createElement("li");
    li.className = "social-item";
    li.innerHTML = `<a href="${profile.socials[key]}" class="social-link" target="_blank">
        <ion-icon name="logo-${key}"></ion-icon>
      </a>`;
    socials.appendChild(li);
  }
}

// 🟢 ABOUT
function loadAbout(about) {
  const aboutSection = document.querySelector(".about-text");
  aboutSection.innerHTML = "";
  about.summary.forEach(p => {
    let para = document.createElement("p");
    para.textContent = p;
    aboutSection.appendChild(para);
  });
}

// 🟢 SERVICES
function loadServices(services) {
  const serviceList = document.querySelector(".service-list");
  serviceList.innerHTML = "";
  services.forEach(srv => {
    let li = document.createElement("li");
    li.className = "service-item";
    li.innerHTML = `
      <div class="service-icon-box">
        <img src="${srv.icon}" alt="${srv.title}" width="60">
      </div>
      <div class="service-content-box">
        <h4 class="h4 service-item-title">${srv.title}</h4>
        <p class="service-item-text">${srv.description}</p>
      </div>
    `;
    serviceList.appendChild(li);
  });
}

// 🟢 RESUME
function loadResume(resume) {
  const expList = document.querySelectorAll(".timeline-list")[0];
  expList.innerHTML = "";
  resume.experience.forEach(exp => {
    let li = document.createElement("li");
    li.className = "timeline-item";
    li.innerHTML = `
      <h4 class="h4 timeline-item-title">${exp.role} (${exp.company})</h4>
      <span>${exp.date}</span>
      <p class="timeline-text">${exp.details.join("<br>")}</p>
    `;
    expList.appendChild(li);
  });

  const eduList = document.querySelectorAll(".timeline-list")[1];
  eduList.innerHTML = "";
  resume.education.forEach(edu => {
    let li = document.createElement("li");
    li.className = "timeline-item";
    li.innerHTML = `
      <h4 class="h4 timeline-item-title">${edu.title} (${edu.institution})</h4>
      <span>${edu.date}</span>
    `;
    eduList.appendChild(li);
  });
}

// 🟢 SKILLS
function loadSkills(skills) {
  const skillsContainer = document.querySelector(".skills-list");
  skillsContainer.innerHTML = "";

  for (let category in skills) {
    let li = document.createElement("li");
    li.className = "skills-item";
    li.innerHTML = `
      <div class="title-wrapper">
        <h5 class="h5">${category}</h5>
      </div>
      <ul class="my-skills">
        ${skills[category].map(skill => `<li class="my-skill">${skill}</li>`).join("")}
      </ul>
    `;
    skillsContainer.appendChild(li);
  }
}

// 🟢 PORTFOLIO
function loadPortfolio(portfolio) {
  const projectList = document.querySelector(".project-list");
  projectList.innerHTML = "";

  portfolio.forEach(proj => {
    let li = document.createElement("li");
    li.className = "project-item active";
    li.setAttribute("data-filter-item", "");
    li.setAttribute("data-category", Array.isArray(proj.category) ? proj.category.join(" ").toLowerCase() : proj.category.toLowerCase());

    li.innerHTML = `
      <a href="${proj.link || "#"}" target="_blank">
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img src="${proj.image}" alt="${proj.title}" loading="lazy">
        </figure>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-category">${Array.isArray(proj.category) ? proj.category.join(", ") : proj.category}</p>
      </a>
    `;

    projectList.appendChild(li);
  });
}

