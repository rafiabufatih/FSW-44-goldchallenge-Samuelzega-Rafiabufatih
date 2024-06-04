//Toggle class active hamburger

const navbarNav = document.querySelector(".navbar-nav");
//Button humburger anonymous function click
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// // //Toggle class active search
// const searchForm = document.querySelector(".search-form");
// const searchBox = document.querySelector("#search-box");
// //Button search anonymous function click
// document.querySelector("#search-button").onclick = (e) => {
//   searchForm.classList.toggle("active");
//   searchBox.focus();
//   e.preventDefault();
// };

//outside click for hidden menu
const hamburger = document.querySelector("#hamburger-menu");
// const searchButton = document.querySelector("#search-button");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  // if (!searchButton.contains(e.target) && !searchForm.contains(e.target)) {
  //   searchForm.classList.remove("active");
  // }
});

//form validation
const checkoutButton = document.querySelector(".popup-menu");
// checkoutButton.disable = true;

//toogle popup
const popupMenu = document.querySelector(".popup");

const form = document.querySelector("#zakatForm");
const totalPayment = document.querySelector("#totalPayment");
form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disable");
      checkoutButton.classList.add("disable");
    } else {
      return false;
    }
  }
  checkoutButton.disable = false;
  checkoutButton.classList.remove("disable");
  document.querySelector("#popup-menu").onclick = (e) => {
    document.querySelector(".popup").style.display = "flex";
    // e.preventDefault();
  };
});
const popupClose = document.querySelector("#popup-close");
popupClose.onclick = () => {
  document.querySelector(".popup").style.display = "none";
};

$("#zakatForm").submit(function (e) {
  e.preventDefault();
  $.ajax({
    url: "http://localhost:3000/api/zakat",
    type: "post",
    data: $("#zakatForm").serialize(),
    success: function () {
      "success payment";
    },
  });
});

$("#liDelete").click(function (e) {
  e.preventDefault();
  const id = sessionStorage.getItem("userId");
  console.log(id);
  $.ajax({
    url: `http://localhost:3000/api/users/${id}`,
    type: "delete",
    data: $("#liDelete").serialize(),
    success: function () {
      "Update Success";
    },
  });
  sessionStorage.removeItem("userId");
  window.location.href = "./index.html";
});

//close form validation

// //get data from zakat form
// const zakatForm = document.querySelector("#zakatForm");

// btnZakat.addEventListener("click", function (e) {
//   e.preventDefault();
//   const formData = new FormData(zakatForm);
//   const data = new URLSearchParams(formData);
//   const objData = Object.fromEntries(data);
//   console.log(objData);
// });
