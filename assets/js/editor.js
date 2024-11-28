const quoteText = document.querySelector("[data-quote-text]");
const quoteAuthor = document.querySelector("[data-quote-author]");
const quoteNextBtn = document.querySelectorAll("[data-next-btn]");
const quotePrevBtn = document.querySelectorAll("[data-prev-btn]");
const quoteCounter = document.querySelector("[data-quote-counter]");
const captureBtn = document.querySelector("[data-capture-btn]");
const bootomNavBnts = document.querySelectorAll("[data-action-btns] button");
const downloadBtn = document.querySelector("[data-download-btn]");
const bgClrBtn = document.querySelector("[data-bg-clr-btn]");
const bgImageBtn = document.querySelector("[data-bg-image-btn]");
const bgGradientBtn = document.querySelector("[data-bg-gradient-btn]");
const bgNav = document.querySelector("[data-top-nav]");
const bgGradient = document.querySelector(".bgGradient__nav");
const bgNavImage = document.querySelector("[data-top-bgimage-nav]");
const customImgInput = document.querySelector("[data-custom-image]");
const customImgBtn = document.querySelector("[data-custom-image-btn]");
const bgTextNav = document.querySelector("[data-top-bgText]");
const bgTextNavContainer = document.querySelector(".bgText__nav .container");
const bgTextBtn = document.querySelector("[data-bg-text-btn]");
const fontContainer = document.querySelector(".font__container .font_card");
const fontBtn = document.querySelector(".btn_font");
const shareBtn = document.querySelector(".shareBtn");

// FONST ARRAY

const fontArray = [
  "Poppins Regular",
  "Lato",
  "Chiralla",
  "Kaushan Script",
  "Bastliga One",
  "Blindfold",
  "Tomatos",
];

fontArray.forEach((font) => {
  let insertFont = `
  <div class="font_line">
    <p style="font-family: ${font};">${font}</p>
    <div style="font-family: ${font};">Hello from Motivo!</div>
  </div>
  `;
  fontContainer.innerHTML += insertFont;

  let allFonts = document.querySelectorAll(".font_card .font_line");

  allFonts.forEach((f) => {
    f.addEventListener("click", () => {
      const fontName = f.querySelector("p").textContent.trim("");
      quoteText.style.fontFamily = fontName;
      document.querySelector(".font__container").classList.remove("active");
    });
  });
});

// FONT CONTAINER
fontBtn.addEventListener("click", () => {
  document.querySelector(".font__container").classList.toggle("active");
  fontBtn.classList.toggle("active");
});

const bgNavContainer = document.querySelector("[data-top-nav] .container");
const bgGradientNav = document.querySelector(
  "[data-top-bgGradient] .container"
);
const changebgContainer = document.querySelector(
  ".quotes_container .container"
);
const params = new URLSearchParams(window.location.search);
let quotes;
let TOTAL_QUOTES;
let CURRENT_QUOTE = 1;

// get the slug
const slug = params.get("slug");

// find the category
const findCategory = categories.find((category) => category.slug === slug);

// fetch the json
const getQuotes = async () => {
  try {
    const response = await fetch(findCategory.json_url);
    const data = await response.json();

    if (data) {
      TOTAL_QUOTES = data.quotes.length;
      quotes = data.quotes;
      createQuoteCard();
    }
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

getQuotes();

const createQuoteCard = () => {
  quoteText.innerHTML = quotes[CURRENT_QUOTE - 1].quote;
  quoteAuthor.innerHTML =
    quotes[CURRENT_QUOTE - 1].author == "Unknown" ? "" : quotes[0].author;
  quoteCounter.innerHTML = `<p>
            <span class="current__item" data-current-item>${CURRENT_QUOTE}</span>
            <span>/</span>
            <span class="total__item" data-totla-item>${TOTAL_QUOTES}</span>
          </p>`;
};

// NEXT AND PREV BUTTON EVENT LISTENER
/**
 * Add an event listener to the next button
 * When the button is clicked, update the CURRENT_QUOTE variable
 * and call the createQuoteCard function
 */
quoteNextBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    // If the user has reached the end of the quotes, reset the CURRENT_QUOTE variable
    if (CURRENT_QUOTE >= TOTAL_QUOTES) {
      CURRENT_QUOTE = 0;
    }

    // Increment the CURRENT_QUOTE variable
    CURRENT_QUOTE++;

    // Call the createQuoteCard function to update the quote card
    createQuoteCard();
  });
});

quotePrevBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    CURRENT_QUOTE--;

    if (CURRENT_QUOTE <= 0) {
      CURRENT_QUOTE = TOTAL_QUOTES;
    }

    createQuoteCard();
  });
});

// quotePrevBtn.addEventListener("click", () => {
//   CURRENT_QUOTE--;

//   if (CURRENT_QUOTE <= 0) {
//     CURRENT_QUOTE = TOTAL_QUOTES;
//   }

//   createQuoteCard();
// });
// CAPTURE BUTTON

let captureAud = new Audio("./assets/images/capture.wav");
const bottomBtns = document.querySelectorAll(".center .action__btns button");

tippy("[data-tippy-content]", {
  placement: "top",
  arrow: true,
});

// BG BUTTON COLOR CHANGER

const getClrsData = () => {
  fetch("../assets/data/colors.json").then((res) =>
    res.json().then((data) => {
      data.forEach((clr) => {
        let insertClrs = `
          <div data-color style="background: ${clr.hex}"></div>  
        `;

        bgNavContainer.insertAdjacentHTML("beforeend", insertClrs);
      });
      // GET ALL COLORS
      const allColors = document.querySelectorAll("[data-color]");
      allColors.forEach((clr) => {
        // console.log(clr);
        clr.addEventListener("click", () => {
          let colorsValue = clr.style.background;
          changebgContainer.style.background = colorsValue;
        });
      });
    })
  );
};
getClrsData();
// GET GRADIENT COLORS
const getGredientClrsData = () => {
  fetch("../assets/data/gradients.json").then((res) =>
    res.json().then((data) => {
      data.forEach((clr) => {
        let gradientClr = clr.colors.join(",");
        let insertClrs = `
          <div data-color style="background: linear-gradient(to right, ${gradientClr})"></div>
        `;

        bgGradientNav.insertAdjacentHTML("beforeend", insertClrs);
      });
      // GET ALL COLORS
      const allColors = document.querySelectorAll("[data-color]");
      allColors.forEach((clr) => {
        // console.log(clr);
        clr.addEventListener("click", () => {
          let colorsValue = clr.style.background;
          changebgContainer.style.background = colorsValue;
        });
      });
    })
  );
};
getGredientClrsData();

const getTextClrsData = () => {
  fetch("../assets/data/colors.json").then((res) =>
    res.json().then((data) => {
      data.forEach((clr) => {
        let insertClrs = `
          <div data-colorText style="background: ${clr.hex}"></div>  
        `;

        bgTextNavContainer.insertAdjacentHTML("beforeend", insertClrs);
      });
      // GET ALL COLORS
      const allColors = document.querySelectorAll("[data-colorText]");
      allColors.forEach((clr) => {
        clr.addEventListener("click", () => {
          // console.log(clr.style.background);
          let colorsValue = clr.style.background;
          changebgContainer.querySelector(".quote__text").style.color =
            colorsValue;
        });
      });
    })
  );
};
getTextClrsData();

bgClrBtn.addEventListener("click", () => {
  bgNav.classList.toggle("show");
  bgNavImage.classList.remove("show");
  bgGradient.classList.remove("show");
  bgTextNav.classList.remove("show");

  // bottomBtns.forEach((btn) => btn.classList.remove("active"));
  // bgClrBtn.classList.add("active");
  bottomBtns.forEach((btn, i) => {
    if (i !== 0) {
      btn.classList.remove("active");
    }
  });
  bgClrBtn.classList.toggle("active");
});

bgImageBtn.addEventListener("click", () => {
  bgNav.classList.remove("show");
  bgNavImage.classList.toggle("show");
  bgGradient.classList.remove("show");
  bgTextNav.classList.remove("show");

  bottomBtns.forEach((btn, i) => {
    if (i !== 1) {
      btn.classList.remove("active");
    }
  });
  bgImageBtn.classList.toggle("active");
});

bgGradientBtn.addEventListener("click", () => {
  bgNav.classList.remove("show");
  bgNavImage.classList.remove("show");
  bgGradient.classList.toggle("show");
  bgTextNav.classList.remove("show");

  bottomBtns.forEach((btn, i) => {
    if (i !== 2) {
      btn.classList.remove("active");
    }
  });
  bgGradientBtn.classList.toggle("active");
});

bgTextBtn.addEventListener("click", () => {
  bgNav.classList.remove("show");
  bgNavImage.classList.remove("show");
  bgGradient.classList.remove("show");
  bgTextNav.classList.toggle("show");

  bottomBtns.forEach((btn, i) => {
    if (i !== 3) {
      btn.classList.remove("active");
    }
  });
  bgTextBtn.classList.toggle("active");
});
// IMAGES ARRAY

for (let i = 1; i <= 14; i++) {
  const imageBg = `
  <img src="./assets/images/backgrounds/${i}.webp" alt="image" />
  `;

  bgNavImage
    .querySelector(".container")
    .insertAdjacentHTML("beforeend", imageBg);
}

let BgImageValue = bgNavImage.querySelectorAll("img");
BgImageValue.forEach((image) => {
  image.addEventListener("click", () => {
    changebgContainer.style.background = `url(${image.src})`;
  });
});

// maximize the editor
const maximizeBtn = document.querySelector("[data-btn-maximize]");

maximizeBtn.addEventListener("click", () => {
  document.body.classList.toggle("maximize");
});

customImgBtn.addEventListener("click", () => {
  customImgInput.click();
});

customImgInput.addEventListener("change", (e) => {
  const imageFile = e.target.files[0];
  const imageURL = URL.createObjectURL(imageFile);

  changebgContainer.style.background = `url(${imageURL})`;
});

// CHANGE EACH IMAGE TO QUOTE CONTAINER

downloadBtn.addEventListener("click", () => {
  document.body.classList.add("maximize");
  document.body.style.height = "100vh";
  document.body.style.overflow = "hidden";
  document
    .querySelector(".quotes_container .quote_editor .logo_title")
    .classList.add("show");

  html2canvas(document.querySelector(".quotes_container .container"), {
    scale: 4,
    useCORS: true, // Enables cross-origin resource sharing
    backgroundColor: null, // Makes the background transparent
  }).then((canvas) => {
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "Motivo.png";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});

// write the code here to share the quote

shareBtn.addEventListener("click", async () => {
  const quote = quotes[CURRENT_QUOTE - 1].quote;
  const author = quotes[CURRENT_QUOTE - 1].author;

  try {
    await navigator.share({
      title: "Motivo Quote",
      text: `${quote} - ${author}`,
    });
  } catch (error) {
    console.error("Error sharing quote:", error);
  }
});
