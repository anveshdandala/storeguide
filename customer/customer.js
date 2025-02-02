//hjfj
class Stack {
    constructor() {
        this.data = [];
    }

    push(item) {
        this.data.push(item);
    }

    printStack() {
        return this.data.flat(); // Flatten the stack to get all matched products in one array
    }

    isEmpty() {
        return this.data.length === 0;
    }
}
const stack =  new Stack();

function searchingCsv(searchData) {
    return new Promise((resolve, reject) => {
        console.log('Searching for:', searchData, 'from csv');
        
        Papa.parse('amazon.csv', {
            download: true,
            header: true,
            skipEmptyLines: true,
            error: function (error, file) {
                console.error('Error processing the CSV:', error, file);
                reject(error);
            },
            complete: function (results) {
                const rows = results.data;

                if (!rows || rows.length === 0) {
                    console.warn('No data found in the CSV.');
                    resolve([]);
                    return;
                }

                const tokens = searchData.toLowerCase().split(/\s+/);

                const row_cnt = rows.map(row => {
                    const productName = row["product_name"] ? row["product_name"].toLowerCase() : '';
                    if (!productName) return { row, cnt: 0 };

                    let cnt = 0;
                    for (let token of tokens) {
                        if (productName.includes(token)) {
                            cnt += 1;
                        }
                    }
                    return { row, cnt };
                });

                const sortedRows = row_cnt
                    .filter(item => item.cnt > 0)
                    .sort((a, b) => b.cnt - a.cnt);

                if (sortedRows.length > 0) {
                    console.log('Matched Rows in 1st CSV:', sortedRows);
                    resolve(sortedRows);
                } else {
                    console.warn('No matches found for:', searchData, 'from csv');
                    resolve([]);
                }
            }
        });
    });
}
function searchingCsv3(searchData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("searching for", searchData, "in csv3");
            Papa.parse('DMart.csv', {
                download: true,
                header: true,
                complete: function (result) {
                    const rows = result.data;
                    const tokens = searchData.toLowerCase().split(/\s+/);

                    if (!rows || rows.length === 0) {
                        console.warn('No data found in the CSV.');
                        resolve([]);
                        return;
                    }

                    const row_cnt = rows.map(row => {
                        const productName = row['Name'] ? row['Name'].toLowerCase() : '';
                        if (!productName) return { row, cnt: 0 };
                        let cnt = 0;
                        for (let token of tokens) {
                            if (productName.includes(token)) {
                                cnt += 1;
                            }
                        }
                        return { row, cnt };
                    });

                    const sortedRows = row_cnt.filter(item => item.cnt > 0).sort((a, b) => b.cnt - a.cnt);
                    if (sortedRows.length > 0) {
                        console.log('Matching rows sorted from csv3:', sortedRows);
                        resolve(sortedRows);
                    } else {
                        console.warn('No matches found for:', searchData);
                        resolve([]);
                    }
                },
                error: function (error, file) {
                    console.log('Error processing 3rd CSV:', error, file);
                    reject(error);
                }
            });
        }, 600);
    });
}
async function handleSearch(searchData) {
    try {
        const results1 = await searchingCsv(searchData);
        const results3 = await searchingCsv3(searchData);

        const combinedResults = [...results1, ...results3];

        const sortedCombinedResults = combinedResults.sort((a, b) => b.cnt - a.cnt);

        console.log('Combined and Sorted Results:', sortedCombinedResults);

        return sortedCombinedResults;
    } catch (error) {
        console.error('Error during search and combine:', error);
        return [];
    }
}
(() => {
    const searchButton = document.getElementById('search');
    const searchInput = document.getElementById('text-area');
    overlayToggle();
    searchButton.addEventListener('click', () => {
        const searchData = searchInput.value.trim().toLowerCase();
        overlayToggle();
        if (!searchData) {
            console.warn('Please enter a valid search term.');
            return;
        }
        console.log('Searching for:', searchData);
        handleSearch(searchData).then(displayResults);
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            overlayToggle();
            const searchData = searchInput.value.trim().toLowerCase();
            if (!searchData) {
                console.warn('Please enter a valid search term.');
                return;
            }
            console.log('Searching for:', searchData);
            handleSearch(searchData).then(displayResults);
        }
    });
})();

//dynamic display of search results
function displayResults(products) {
    products.slice(0, 50).forEach(product => {
        const data = product.row || product;

        const card = document.createElement('div');
        card.className = 'product-card';
    
        card.innerHTML = `
            <img src="${data.imageURLs || data.img_link || '/img/placeholder.png'}" 
                alt="${data.Name || data.name || 'Product'}">
                
            <p><strong>Brand:</strong> ${data.Brand || 'N/A'}</p>
            <p><strong>Category:</strong> ${data.Category || data.SubCategory || 'N/A'}</p>
            <p><strong>Quantity:</strong> ${data.Quantity || 'N/A'}</p>
    
            <p>${(data.p_description || data.Description || data.about_product || 'No description available.').slice(0, 100)}...</p>
    
            <p><strong>Price:</strong> $${data.Price || data.price || 'N/A'}</p>
            <p><strong>Discounted Price:</strong> $${data.DiscountedPrice || 'N/A'}</p>
            <p><strong>Breadcrumbs:</strong> ${data.BreadCrumbs || 'N/A'}</p>
    
            <button onclick="addToList('${data.p_id || data.product_id || data.ID || ''}')">Add to List</button>
        `;
    
        document.getElementById('products-grid').appendChild(card);
    });
    
}
    
const overlay = document.getElementById("results");
()=>{
    overlay.style.display = "none";
}
function overlayToggle(){
    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.style.display = overlay.style.display === "block" ? "none" : "block";
    }
};


function addToList(productId) {
    console.log(`Product with ID ${productId} added to the list.`);
}

//adds
let adds ={
    add1: "img/add1.png",
    add2: "img/add2.png",
    add3: "img/add3.png",
    add4: "img/add4.png",
    add5: "img/add5.png", 
};
let addArray=[adds.add1, adds.add2, adds.add3, adds.add4, adds.add5];

let leftpos = 0;
let rightpos = 1;
const addLeft = document.getElementById('leftAdd');
const addRight = document.getElementById('rightAdd');
const leftButton = document.getElementById('leftBbutton');
const rightButton = document.getElementById('rightButton');

addLeft.setAttribute('src', addArray[leftpos]);
addRight.setAttribute('src', addArray[rightpos]);

rightButton.addEventListener('click', function(){
    leftpos = (leftpos + 1) % addArray.length; // Move left position forward
    rightpos = (rightpos + 1) % addArray.length; // Move right position forward
    addLeft.setAttribute('src', addArray[leftpos]);    
    addRight.setAttribute('src', addArray[rightpos]);

});

leftButton.addEventListener('click', function(){
    leftpos = (leftpos - 1 + addArray.length) % addArray.length; 
    rightpos = (rightpos - 1 + addArray.length) % addArray.length;

    addLeft.setAttribute('src', addArray[leftpos]);
    addRight.setAttribute('src', addArray[rightpos]);
});


function step(timestamp) {
    var start = null;
    if (!start) start = timestamp; // Initialize the start time
    var progress = timestamp - start; // Calculate progress
    elemdocument.getElementById('announcement').style.transform = 'translateX(' + Math.min(progress / 10, 600) + 'px)';
    if (progress < 9000) { // Continue the animation for 2 seconds (adjust as needed)
        window.requestAnimationFrame(step); // Recursive call for smooth animation
    }
}

// 2000 x 1200 Pixels
let result_count = 0; 
document.getElementById('search').addEventListener('click', () => {
    result_count+=result_count;
    if (result_count%2===0) {
        on();
    } else {
        off();
    }
});

function on() {
    document.getElementById("results").style.display = "block";
}
function off() {
    document.getElementById("results").style.display = "none";
}
