/*
 * ✅ Use the Coinlore API (Coins)
 *    https://www.coinlore.com/cryptocurrency-data-api
 *
 *    Get 10 coins per "page"
 */

let dataCollection = [];
let currentPage = 1;
const numberPerPage = 10;
let numberOfPages;
let pageList = new Array;


const tbody = document.querySelector("tbody");
const table = document.querySelector('table');
const headers = document.getElementsByTagName("th");

// Create spans for mobile-view table headers
const coinHeader = document.createElement("span");
const codeHeader = document.createElement("span");
const priceHeader = document.createElement("span");
const totalSupplyHeader = document.createElement("span");

coinHeader.innerHTML = headers[0].outerText;
codeHeader.innerHTML = headers[1].outerText;
priceHeader.innerHTML = headers[2].outerText;
totalSupplyHeader.innerHTML = headers[3].outerText;

/* Pagination button section starts */
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

nextBtn.addEventListener('click', nextPage = () => {
    currentPage += 1;
    loadList();
});
prevBtn.addEventListener('click', prevPage = () => {
    currentPage -= 1;
    loadList();
});

/* Pagination button section ends */


fetch("https://api.coinlore.com/api/tickers/", {
        mode: "cors"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("HTTP error, status = " + res.status);
        }
        return res.json();
    })
    .then(res => {
        dataCollection = res.data;
        const getNumberofPages = () => {
            return dataCollection.length / numberPerPage;
        };
        numberOfPages = getNumberofPages();
        loadList();

        /* want to Load full list without pagination? uncomment below */
        /* dataCollection.forEach(cryptocurrency => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>
            <span>${coinHeader.innerHTML}</span>
      ${cryptocurrency.name}
      </td>
                       <td>
                       <span>${codeHeader.innerHTML}</span>
                       ${cryptocurrency.symbol}
                       </td>
                       <td>
                       <span>${priceHeader.innerHTML}</span>
                       $ ${cryptocurrency.price_usd}
                       </td>
                       <td>
                       <span>${totalSupplyHeader.innerHTML}</span>
                       ${cryptocurrency.tsupply}
                       </td>`;

            tbody.appendChild(row);
        }); */
    });


function loadList() {
    const begin = ((currentPage - 1) * numberPerPage);
    const end = begin + numberPerPage;

    pageList = dataCollection.slice(begin, end);
    drawList();
    check();
}

function drawList() {
    tbody.innerHTML = "";

    for (i = 0; i < pageList.length; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>
            <span>${coinHeader.innerHTML}</span>
      ${pageList[i].name}
      </td>
                       <td>
                       <span>${codeHeader.innerHTML}</span>
                       ${pageList[i].symbol}
                       </td>
                       <td>
                       <span>${priceHeader.innerHTML}</span>
                       $ ${pageList[i].price_usd}
                       </td>
                       <td>
                       <span>${totalSupplyHeader.innerHTML}</span>
                       ${pageList[i].tsupply}
                       </td>`;
        tbody.appendChild(row);
    }
}

function check() {
    currentPage == numberOfPages ? nextBtn.style.visibility = 'hidden' : nextBtn.style.visibility = 'visible';
    currentPage == 1 ? prevBtn.style.visibility = 'hidden' : prevBtn.style.visibility = 'visible';
}