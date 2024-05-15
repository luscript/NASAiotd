/*document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("search");
    const button = document.getElementById("search-button");
    const content = document.getElementById("mostrar-imagenes");
    console.log(button, input, content);
    button.addEventListener("click", () => {
        const searchTerm = input.value.trim();
        if (searchTerm !== "") {
            searchNASAImages(searchTerm);
        } else {
            alert("Por favor, ingrese un termino de busqueda");
        }
    });

    const searchNASAImages = (searchTerm) => {
        const url = `https://images-api.nasa.gov/search?q=${searchTerm}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error en la petición");
                }
                return response.json();
            })
            .then((data) => {
                displayImages(data);
            })
            .catch((error) => {
                alert("Error al buscar imagenes");
            });
    };

    const displayImages = (data) => {
        content.innerHTML = "";
        data.collection.items.forEach((item) => {
            const imgDiv = document.createElement("div");
            const img = document.createElement("img");
            img.src = item.links[0].href;
            img.alt = item.data[0].title;
            imgDiv.appendChild(img);
            content.appendChild(imgDiv);
        });
    }
});*/


const displayImages = (data) => {
    const content = document.getElementById("mostrar-imagenes");
    content.innerHTML = "";
    data.collection.items.forEach((item) => {
        const imgDiv = document.createElement("div");
        imgDiv.className = "img-container";
        const img = document.createElement("img");
        img.src = item.links[0].href;
        img.alt = item.data[0].title;
        imgDiv.appendChild(img);
        content.appendChild(imgDiv);
    });
}

const searchNASAImages = (searchTerm) => {
    const url = `https://images-api.nasa.gov/search?q=${searchTerm}`;
    displayLoading();
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la petición");
            }
            return response.json();
        })
        .then((data) => {
            displayImages(data);
        })
        .catch((error) => {
            alert("Error al buscar imagenes");
        })
        .finally(() => {
            hideLoading();
        });
};
const handleClick = () => {
    const input = document.getElementById("search");
    const searchTerm = input.value.trim();
    if (searchTerm !== "") {
        searchNASAImages(searchTerm);
    } else {
        alert("Por favor, ingrese un termino de busqueda");
    }
}



const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "/pages/404.html",
    "/": "/pages/inicio.html",
    "/info": "/pages/info.html",
    "/imagenes": "/pages/imagenes.html",
};

let imageNasaLoaded = false;
const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
    if (path === "/" || path === "/inicio")  {
        loadNasaImage();
    }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();

const loadNasaImage = () => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=wbCB6InVkcdhUqdW8JGMeNXJ7olJ3ON4pX1rSf8E')
    .then(response => response.json())
    .then(data => {
        const img = document.createElement('img');
        const title = document.createElement('h2');
        const date= document.createElement('p');
        const explanation = document.createElement('p');
        img.src = data.url;
        title.textContent = data.title;
        date.textContent = data.date;
        explanation.textContent = data.explanation;
        document.getElementById('nasa-image').appendChild(img);
        document.getElementById('nasa-image-title').appendChild(title);
        document.getElementById('nasa-image-date').appendChild(date);
        document.getElementById('nasa-image-explanation').appendChild(explanation);
    });
}

function displayLoading() {
    const loader = document.querySelector("#loading");
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 8000);
}

function hideLoading() {
    const loader = document.querySelector("#loading");
    loader.classList.remove("display");
}