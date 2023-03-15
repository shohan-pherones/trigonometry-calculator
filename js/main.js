// ELEMENTS
const cardsContainer = document.querySelector(".cards");

// CARDS DATA
const cardsData = [
  {
    title: "Triangle",
    image:
      "https://img.freepik.com/vecteurs-libre/vecteur-forme-geometrique-triangle-jaune_53876-175072.jpg",
    formula: "0.5 x a x b",
    constant: 0.5,
  },
  {
    title: "Rectangle",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Rectangle_example.svg/1280px-Rectangle_example.svg.png",
    formula: "a x b",
    constant: 1,
  },
  {
    title: "Circle",
    image: "https://www.pngmart.com/files/4/Circle-PNG-File.png",
    formula: "PI x a x b",
    constant: 3.14,
  },
  {
    title: "Rhombus",
    image:
      "https://www.pngitem.com/pimgs/m/134-1347474_rhombus-cliparts-blue-rhombus-hd-png-download.png",
    formula: "0.5 x a x b",
    constant: 0.5,
  },
  {
    title: "Trapezoid",
    image: "https://cdn-icons-png.flaticon.com/512/5853/5853922.png",
    formula: "0.5 x a x b",
    constant: 0.5,
  },
  {
    title: "Square",
    image:
      "https://i.pinimg.com/originals/0a/5f/04/0a5f047c4157a30eb15667e3dcc8bc6f.png",
    formula: "a x b",
    constant: 1,
  },
];

// looping through cards
for (const card of cardsData) {
  renderCard(card);
}

// rendering single card
function renderCard(data) {
  const template = `
    <div
      class="card w-[20rem] overflow-hidden p-5 shadow-md bg-white rounded-lg flex flex-col gap-5"
    >
      <div
        class="img w-full h-[18rem] flex justify-center items-center overflow-hidden rounded"
      >
        <img
          src=${data.image}
          alt=${data.title}
          class="w-full"
        />
      </div>
      <h2 class="card-title text-2xl font-medium text-center">${data.title}</h2>
      <p class="card-formula text-center">(${data.formula}) cm<sup>2</sup></p>
      <div class="input-fields flex gap-5">
        <input
          type="number"
          class="first-input-field border w-full outline-none text-center rounded focus:border-sky-500 duration-300 py-1"
          placeholder="a"
        />
        <input
          type="number"
          class="second-input-field border w-full outline-none text-center rounded focus:border-sky-500 duration-300 py-1"
          placeholder="b"
        />
      </div>
      <p class="output-paragraph text-center hidden"></p>
      <button
        data-constant=${data.constant}
        class="card-btn bg-sky-500 py-2 rounded text-white hover:bg-gray-700 duration-300"
      >
        Calculate
      </button>
    </div>
  `;

  cardsContainer.insertAdjacentHTML("beforeend", template);
}

// card buttons handler
const calcBtns = cardsContainer.querySelectorAll(".card-btn");

for (const btn of calcBtns) {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    const outputEl = card.querySelector(".output-paragraph");
    const input1 = card.querySelector(".first-input-field");
    const input2 = card.querySelector(".second-input-field");
    const constant = btn.dataset.constant;

    // validate input values
    const isValid = validateInputValues(input1, input2);

    // for false
    if (!isValid) {
      renderError(outputEl);

      // clear
      input1.value = input2.value = "";
    }

    if (isValid) {
      // calculate
      const area = calculateArea(constant, input1.value, input2.value);

      // render calculated value
      renderArea(area, outputEl);

      // clear
      input1.value = input2.value = "";
    }
  });
}

// validate input values
function validateInputValues(input1, input2) {
  const num1 = Number(input1.value);
  const num2 = Number(input2.value);

  if (num1 < 1 || num2 < 1) {
    return false;
  }

  return true;
}

// rendering error
function renderError(el) {
  el.classList.remove("hidden");
  el.textContent = "Inputs should be greater than 0.";

  if (el.classList.contains("text-teal-500")) {
    el.classList.remove("text-teal-500");
    el.classList.add("text-rose-500");
  } else {
    el.classList.add("text-rose-500");
  }
}

// calculating area
function calculateArea(constant, input1, input2) {
  const CONSTANT = Number(constant);
  const num1 = Number(input1);
  const num2 = Number(input2);

  const area = CONSTANT * num1 * num2;
  return area;
}

// rendering area
function renderArea(area, el) {
  el.classList.remove("hidden");
  el.innerHTML = `Area: ${area.toFixed(2)} cm<sup>2</sup>`;

  if (el.classList.contains("text-rose-500")) {
    el.classList.remove("text-rose-500");
    el.classList.add("text-teal-500");
  } else {
    el.classList.add("text-teal-500");
  }
}
