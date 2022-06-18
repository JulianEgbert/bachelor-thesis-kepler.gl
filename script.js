const BASE_URL = "https://raw.githubusercontent.com/JulianEgbert/bachelor-thesis-kepler.gl";
var config = "";
var loadedFilename = "";
var loadingHTML = "<h1> Loading </h1>";

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
    try {
        loadKeplerFromFilepath(filename);
        loadedFilename = filename;
    } catch (e) {
        console.error(e);
    }
}

function loadKeplerFromFilepath(filepath) {
    const url = `${config.baseUrl}${config.branch}/${filepath}`;
    loadKeplerFromUrl(url);
}

function displayLoading() {
    document.getElementById("kepler.gl-content").srcdoc = loadingHTML;
}

function loadKeplerFromUrl(url) {
    fetch(url).then(function (response) {
        return response.text();
    }).then(function (html) {
        document.getElementById("kepler.gl-content").srcdoc = parseHTML(html);
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