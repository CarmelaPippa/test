let sidebar = document.querySelector("#sidebar");
let infoContainer = document.querySelector(".info__container");
let gender = document.querySelector(".gender");
let feeling = document.querySelector(".feeling");
let other = document.querySelector(".other");
let formEl = document.querySelector("#myForm");
let firstParagraph = document.querySelector(".first-paragraph");
let feedbackButton = document.querySelector(".feedbackBtn");
let mapEl = document.querySelector("#map");
let overlayEl = document.querySelector(".overlay");

function handleInfoButton() {
  infoContainer.style.display = "none";
  sidebar.style.display = "flex";
}

function handleFeedbackButton() {
  gender.style.display = "flex";
  feeling.style.display = "flex";
  other.style.display = "flex";
  formEl.style.display = "inline-block";
  styleSidebar(sidebar);
  firstParagraph.innerText = "Give us feedback";
  firstParagraph.style.marginBottom = "12px";
  feedbackButton.style.display = "none";
}

function styleSidebar(element) {
  element.style.height = "95vh";
  element.style.gap = "12px";
  element.style.position = "absolute";
  element.style.left = "0";
  element.style.bottom = "0";
  element.style.justifyContent = "center";
}

formEl.addEventListener("submit", function (event) {
  event.preventDefault();
  let formData = new FormData(this);

  let data = {};
  formData.forEach(function (value, key) {
    data[key] = value;
  });

  fetch(
    "https://script.google.com/macros/s/AKfycbzAdiTP0jWO6Mj5THG1OJuBUv_aFR8YxFJHkZZY20ctn-IloBDQnTDytSCPllzSSnTZbw/exec",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // Gestisci la risposta di successo
    })
    .catch((error) => {
      console.error("Error:", error);
      // Gestisci gli errori
    });
});

// Fetch the API key from the server and load the Google Maps script
fetch("/api/maps-key")
  .then((response) => response.json())
  .then((data) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${data.key}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  })
  .catch((error) => console.error("Error fetching the API key:", error));

function submitForm() {
  var checkBox = document.getElementById("accept");
  if (!checkBox.checked) {
    alert("Please accept the Term of Use and Privacy Policy.");
    return; // Prevent further execution of the function
  }
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var gender = document.getElementById("gender").value;
  var commentsSelect = document.getElementById("commentsSelect").value;
  var location = document.getElementById("location").value;
  var other = document.getElementById("other").value;

  var checkboxes = document.querySelectorAll(
    'input[name="feedbackSelect"]:checked'
  );
  var feedbackSelect = [];
  checkboxes.forEach(function (checkbox) {
    feedbackSelect.push(checkbox.value);
  });

  sidebar.style.display = "none";
  mapEl.style.display = "none";
  overlayEl.style.display = "flex";

  google.script.run.onSubmitForm({
    name: name,
    email: email,
    gender: gender,
    commentsSelect: commentsSelect,
    location: location,
    other: other,
    feedbackSelect: feedbackSelect,
  });
}

// Add new pin and refresh page
function redirectTo(url) {
  window.open(url, "_blank");
}

function onNewPinButtonClick() {
  // Disabilita il pulsante e mostra l'indicatore di caricamento
  document.getElementById("refreshButton").disabled = true;
  document.getElementById("loading").style.display = "block";

  google.script.run
    .withSuccessHandler(function (url) {
      window.open(url, "_top");
    })
    .getScriptURL();
}

let map;
let marker;

function initMap() {
  const initialLocation = {
    lat: 59.33091976142107,
    lng: 18.060195177256297,
  }; // Set initial location to default or user's location
  map = new google.maps.Map(document.getElementById("map"), {
    center: initialLocation,
    zoom: 16, // Adjust the zoom level as needed
  });
  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: initialLocation,
  });
  // Add event listener for marker dragend
  google.maps.event.addListener(marker, "dragend", function () {
    updateLocationInput(marker.getPosition());
  });
}

function updateLocationInput(latLng) {
  // Use Geocoding API to get the address from LatLng
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: latLng }, function (results, status) {
    if (status === "OK") {
      if (results[0]) {
        document.getElementById("location").value =
          results[0].formatted_address;
      }
    } else {
      console.error(
        "Geocode was not successful for the following reason: " + status
      );
    }
  });
}

function validateForm() {
  console.log("Form submitted"); // Debugging
  var checkBox = document.getElementById("accept");
  if (!checkBox.checked) {
    alert("Please accept the Term of Use and Privacy Policy.");
    return false; // Prevent form submission
  }
  return true; // Allow form submission
}
