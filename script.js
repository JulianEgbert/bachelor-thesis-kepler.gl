const BASE_URL = "https://raw.githubusercontent.com/JulianEgbert/bachelor-thesis-kepler.gl";
var config = "";
var loadedFilename = "";
var loadingHTML = "<h1> Loading </h1>";
const errorHTML = `<div class="error"> <a>&#10060;</a><p> An error has occured! <p> <p>Try again or load another file.</p></div><style>
.error {
  font-size: 120px;
  width: 100%;
  height: 200px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -100px;
  user-select: none;
}.error a {
  text-shadow: 0 0 3px rgb(41, 50, 60);
}.error p {
  color: white;
  font-size: 3rem;
  margin: 5px;
}</style>`;

function loadConfig() {
    fetch(`${BASE_URL}/main/config.json`).then(function (response) {
        return response.json();
    }).then(configLoaded);
    fetch(`${BASE_URL}/main/loading.html`).then(function (response) {
        return response.text();
    }).then(function (html) {
        loadingHTML = html;
    });
}

function configLoaded(newConfig) {
    config = newConfig;
    const selectEl = document.getElementById("fileSelect");
    config.files.forEach((file) => {
        const option = document.createElement("option");
        option.value = file.path;
        option.innerHTML = file.name;
        selectEl.appendChild(option);
    });
}

loadConfig();

function loadFromInput() {
    const inputField = document.getElementById("fileSelect");
    if (inputField.disabled || inputField.value == "") {
        return;
    }
    const filename = inputField.value;
    if (filename == loadedFilename)
        return;
    
    loadKeplerFromFilepath(filename);
    loadedFilename = filename;
}

function loadKeplerFromFilepath(filepath) {
    const url = `${config.baseUrl}${config.branch}/${filepath}`;
    loadKeplerFromUrl(url);
}

function displayLoading() {
    document.getElementById("kepler.gl-content").srcdoc = loadingHTML;
}

function displayLoadingError() {
    const iframe = document.getElementById("kepler.gl-content");
    iframe.srcdoc = errorHTML;
}

function handleFetchErrors(response) {
    if (!response.ok) {
        loadedFilename = "";
        displayLoadingError();
        throw Error(response);
    }
    return response;
}

function loadKeplerFromUrl(url) {
    displayLoading();
    fetch(url).then(handleFetchErrors).then(response => response.text()).then(function (html) {
        document.getElementById("kepler.gl-content").srcdoc = parseHTML(html);
    }).catch(function (e) {
        console.error("An error occured while fetching the requested file.");
    });
}

function parseHTML(html) {
    // Inject a valid MAPBOX_TOKEN here.
    if (!config || !config.mapboxToken) {
        window.alert("No mapbox token provided in config file.");
        return html;
    }
    html = html.replace("'PROVIDE_MAPBOX_TOKEN'", `'${config.mapboxToken}'`);
    return html;
}