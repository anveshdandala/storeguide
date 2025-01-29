
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

// //searching from amazon.csv file
function searchingCsv(searchData) {
    return new Promise((resolve, reject) => {
        console.log('Searching for:', searchData, 'from csv');
        
        Papa.parse('amazon.csv', {
            download: true,
            header: true,
            skipEmptyLines: true,
            error: function (error, file) {
                console.error('Error processing the CSV:', error, file);
            },
            complete: function (results) {
                console.log('CSV data parsed:', results);
                const rows = results.data;

                if (!rows || rows.length === 0) {
                    console.warn('No data found in the CSV.');
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

                    sortedRows.forEach(item => stack.push(item.row)); 
                } else {
                    console.warn('No matches found for:', searchData, 'from csv');
                }
                resolve();
            }
        });
    });
}
//products.csv
function searchingCsv2(searchData){
    return new Promise((resolve, reject) => {
    setTimeout(() => {
    console.log("searching for",searchData,"in csv2");
    Papa.parse('products.csv',{
        download:true,
        header:true,
        complete:function(result) {
            const rows = result.data;
            // console.log('Parsed rows:', rows);
            const tokens = searchData.toLowerCase().split(/\s+/);

            if (!rows || rows.length === 0) {
                console.warn('No data found in the CSV.');
                return;
            }
            const row_cnt=rows.map(row=>{
                const productName =  row['name'] ? row['name'].toLowerCase() : '';
                if (!productName) return {row,cnt:0};
                let cnt=0;
                for (let token of tokens) {
                    if (productName.includes(token)) {
                        cnt += 1;
                    }
                }
                return {row,cnt};
            });
            
            const sortedRows = row_cnt.filter(item => item.cnt > 0).sort((a, b) => b.cnt - a.cnt);
            if (sortedRows.length > 0) {
                console.log('Matching rows sorted from csv2:', sortedRows);
                sortedRows.forEach(item => stack.push(item.row));
            }
            else {
                console.warn('No matches found for:', searchData);
            }
            resolve();

        },
        error: function(error,file){
            console.log('Error processing 2nd CSV:', error, file)
        }

    });
    },1000);
});
}
async function handleSearch() {

    const searchData = document.getElementById('text-area').value.trim().toLowerCase();    
    if (!searchData) {
        console.warn('Please enter a valid search term.');
        return;
    }
    stack.data=[];
    try {
        await Promise.all([searchingCsv(searchData),searchingCsv2(searchData)]);
        if(stack.isEmpty()){
            console.log('no match found in either of em');
        }
        else{
            console.log('final avilable products are',stack.printStack()); 
            displayResults(stack.printStack());
            console.log(typeof(stack.printStack()));
        }
    } catch (error) {
        console.error('Error during search:', error);
    }
    
}
(() => {
    document.getElementById('search').addEventListener('click', handleSearch);
    document.getElementById('text-area').addEventListener('keypress', function(event){
        if(event.key==='Enter'){
            handleSearch();
        }

    });

})();

//dynamic display of search results
function displayResults(products) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = ''; // Clear previous results

    products.slice(0, 50).forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <img src="${product.imageURLs || product.img_link || 'placeholder.jpg'}" 
                alt="${product.name || product.product_name || 'Product'}">
            <h3>${(product.name || product.product_name || 'Unnamed Product').slice(0, 20)}...</h3>  <!-- Show only first 20 characters -->
            <p>${(product.p_description || product.about_product || 'No description available.')
                .slice(0, 100)}...</p>  <!-- Truncate description to 100 characters -->
            <p><strong>Price:</strong> $${product.price || product.discounted_price || 'N/A'}</p>
            <button onclick="addToList('${product.id || product.product_id || ''}')">Add to List</button>
        `;

        productsGrid.appendChild(card);
    });
}

function addToList(productId) {
    console.log(`Product with ID ${productId} added to the list.`);
    // Implement your "add to list" functionality here
}

//adds
let adds ={
    add1: "/img/add1.png",
    add2: "/img/add2.png",
    add3: "/img/add3.png",
    add4: "/img/add4.png",
    add5: "/img/add5.png", 
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
