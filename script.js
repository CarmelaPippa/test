let btnEl = document.querySelector("button");

// btnEl.addEventListener("click", function () {
//   console.log("Button clicked");
//   window.location.href = "https://linktr.ee/yourwayhomestockholm";
// });

btnEl.addEventListener("click", function () {
  if (navigator.userAgent.includes("Instagram")) {
    window.location.href = "https://linktr.ee/yourwayhomestockholm";
  } else {
    window.location.href =
      "https://script.google.com/macros/s/AKfycby03ipJ4q6tdydTDYQjicbadMzp5vqBJPwcqXc4WcU7-vRA5qN7APLN6CJBLRdeAkHmxg/exec";
  }
});
