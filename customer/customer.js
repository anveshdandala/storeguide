url="https://dummyjson.com/products";

class adds{
    constructor(image, name, url){
        this.image = image;
        this.name = name;
        this.url = url;
        }
}
const getdata = async () => {
    let response = await fetch(url);
    console.log(response);
    }

let p = new Promise((resolve, reject) => {
    let a = 10;
    if (a == 10) {
        resolve("yes");
    } else {
        reject("no");
    }
});
p.then(response=>{
    console.log(response);
}).catch((response)=>{
    console.log(response);
});