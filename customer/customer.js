
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

const url="https://dummyjson.com/products";

// //searching from csv file
function searchingCsv () {
    const searchData = document.getElementById('text-area').value.trim().toLowerCase();
    console.log('Searching for: ' + searchData + ' from csv');
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
                resolve(false);
                return;
            }

            const matchedRows = rows.filter(row => {
                const productName = row["product_name"];
                return productName && productName.toLowerCase().includes(searchData);
            });

            if (matchedRows.length > 0) {
                console.log('Matched Rows:', matchedRows);
                stack.push(matchedRows);
            } else {
                console.warn('No matches found for:', searchData, 'from csv');
            }
        }
    });
}
function searchingCsv2(searchData){
    console.log("searching for",searchData,"in csv2");
    Papa.parse('products.csv',{
        download:true,
        header:true,
        step:function(results){
            const rows = results.data;
            console.log(rows);
            if (rows.some(row => row.someField && row.someField.toLowerCase().includes(searchData))) {
                console.log('Match found in CSV2:', rows);
                stack.push(rows);
            } else {
                console.warn('No matches found for:', searchData, 'in CSV2');
            }
        },
        complete:()=>{

        }

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
        await Promise.all([searchingCsv(),searchingApi(searchData)]);
        if(stack.isEmpty()){
            console.log('no match found in either of em');
        }
        else{
            console.log('final avilable products are',stack.printStack()); // result from both data sets 
        }
    } catch (error) {
        console.error('Error during search:', error);
    }
    
}
(() => {
    document.getElementById('search').addEventListener('click', handleSearch());
    document.getElementById('text-area').addEventListener('keypress', function(event){
        if(event.key==='Enter'){
            handleSearch();
        }

    });
})();



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

var start = null;
var element = document.getElementById('announcement');

function step(timestamp) {
    if (!start) start = timestamp; // Initialize the start time
    var progress = timestamp - start; // Calculate progress
    element.style.transform = 'translateX(' + Math.min(progress / 10, 600) + 'px)';

    if (progress < 9000) { // Continue the animation for 2 seconds (adjust as needed)
        window.requestAnimationFrame(step); // Recursive call for smooth animation
    }
}

// Start the animation
function startAnimation() {
    window.requestAnimationFrame(step);
    let announcement = document.getElementById('announcement');
    xpos = 0;
    ypos = 0;
    
}
//categories 
const i = document.getElementById('category-image');
const n = document.getElementById('category-name');
const d = document.getElementById('category-description');
let categoryArray = [
    {
        name: "Category 1",
        subcategories: ["Subcat 1", "Subcat 2"],
        link: "https://via.placeholder.com/150", // Example image URL
        description: "Description for Category 1"
    },
    {
        name: "Category 2",
        subcategories: ["Subcat A", "Subcat B"],
        link: "https://via.placeholder.com/150", // Example image URL
        description: "Description for Category 2"
    },
    {
        name: "Category 3",
        subcategories: ["Subcat X", "Subcat Y"],
        link: "https://via.placeholder.com/150", // Example image URL
        description: "Description for Category 3"
    }
];

// 2000 x 1200 Pixels
