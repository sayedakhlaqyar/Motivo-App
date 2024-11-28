const toggleBtn = document.querySelector(".menu_btn");
const categoriesElem = document.querySelector(".categories");
const searchInput = document.querySelector(".searchInput");
const aboutMeBtn = document.querySelector(".me_btn");
const closeBtns = document.querySelectorAll("[data-close-btn]");

toggleBtn.addEventListener("click", () => {
  document.querySelector(".nav_bar ul").classList.toggle("show");
  toggleBtn.classList.toggle("active");
});

aboutMeBtn.addEventListener("click", () => {
  document.querySelector(".overlay").classList.add("active");
  document.querySelector(".about_all_round").classList.add("active");
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".overlay").classList.remove("active");
    document.querySelector(".about_all_round").classList.remove("active");
  });
});
// const getCategories = () => {
//   fetch("../data/categories.json").then((res) =>
//     res.json().then((data) => createCategoryCards(data))
//   );
// };

// getCategories();

const createCategoryCards = () => {
  categories.forEach((category) => {
    let card = `
    <div class="card" data-slug="${category.slug}">
    <div class="card_img">
      <img src="${category.image_url}" alt="" />
    </div>
    <div class="card_content">
      <p class="card_category">${category.category}</p>
      <p class="card_title">${category.title}</p>
    </div>
  </div>

    `;
    categoriesElem.innerHTML += card;
    searchInput.addEventListener("keyup", () => {
      let value = searchInput.value.toLowerCase();
      let cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        let title = card.querySelector(".card_title").textContent.toLowerCase();
        if (title.indexOf(value) != -1) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      let slug = card.getAttribute("data-slug");

      let params = new URLSearchParams(window.location.search);

      params.append("slug", slug);

      location.href = "editor.html?" + params.toString();
    });
  });
};

createCategoryCards();

window.addEventListener("load", () => {
  document.querySelector(".loader_full").remove();
  document.body.classList.remove("hideScroll");
});
