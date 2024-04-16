let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");


let mode ="creat"
let btn


// total
function fortotal() {
  if (price.value != "") {
    let totalvalue = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = totalvalue;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "red";
      }
}


// insert data
let proarr;
if (localStorage.products != null) {
  proarr = JSON.parse(localStorage.products);
} else {
  proarr = [];
}
submit.onclick = function () {
  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value,
    count:count.value,
  };
  if(title.value!=''&&price.value!=''&&category.value!=''&&count.value<50){
    if (mode==="creat"){
   if(count.value>1){
    for(let i=0; i<count.value;i++){
        proarr.push(newpro);
        
    }
   
  }else{
    proarr.push(newpro)
  }

 } else{
  proarr[btn]=newpro
  submit.innerHTML="ctreat"
  mode="creat"
  count.style.display="block"

 }
 cleardata();
  }
 
    
 
  localStorage.setItem("products", JSON.stringify(proarr));
  console.log(proarr);
  showdata()
};



// after adding data remove fields
function cleardata() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  total.innerHTML = "";
  category.value = "";
  count.value = "";
}





//output
function showdata() {
  fortotal()
    let dataitems = ``
  for (let i=0; i<proarr.length; i++) {
 
    dataitems += `
    <tr>
        <td>${i+1}</td>
        <td>${proarr[i].title} </td>
        <td>${proarr[i].price}</td>
        <td>${proarr[i].taxes}</td>
        <td>${proarr[i].ads}</td>
        <td>${proarr[i].discount}</td>
        <td>${proarr[i].total}</td>
        <td>${proarr[i].category}</td>
        <td><button onclick=updatData(${i}) id="update">update</button></td>
        <td><button onclick=delet(${i}) id="delete">delete</button></td>
    </tr>
        `;
        
  }
 document.getElementById("databody").innerHTML=(dataitems)
        if (proarr.length>0){
            document.getElementById("deletall"). innerHTML=`<button onclick=deletalll() >delet all (${proarr.length})</button>`
        }else{
            document.getElementById("deletall"). innerHTML=""
        }
        
}
showdata()



//delet 
function delet(i){
    proarr.splice(i,1)
    localStorage.products= JSON.stringify(proarr)
    showdata()
}
//update
function updatData(i){
  title.value = proarr[i].title;
  price.value =  proarr[i].price;
  ads.value =  proarr[i].ads;
  taxes.value =  proarr[i].taxes;
  discount.value =  proarr[i].discount;
  total.innerHTML =  proarr[i].total;
  category.value =  proarr[i].category;
  count.value =  proarr[i].count;
  submit.innerHTML="update"
  btn=i
  mode="update"
  total.style.backgroundColor="green"
  count.style.display="none"
  scroll({
    top:0,
    behavior:"smooth"
  })

}
//deletall
function deletalll(){
    proarr.splice(0)
    localStorage.clear()
    showdata()
}



//search by title or categor
let searchtype= "title"
 
function searchData(id){
  if((id)==="Title"){
    searchtype= "title"
  }
  else{
    searchtype= "category"
  }
  search.value=''
showdata()
search.focus()
  search.setAttribute("placeholder",`search by ${searchtype}`)

}



//search
function showResearch(value){
  if(searchtype== "title"){
     let dataitems=''
    for(let i=0;i<proarr.length;i++){
     

      if (proarr[i].title.includes(value)){
        dataitems += `
    <tr>
        <td>${i+1}</td>
        <td>${proarr[i].title} </td>
        <td>${proarr[i].price}</td>
        <td>${proarr[i].taxes}</td>
        <td>${proarr[i].ads}</td>
        <td>${proarr[i].discount}</td>
        <td>${proarr[i].total}</td>
        <td>${proarr[i].category}</td>
        <td><button onclick=updatData(${i}) id="update">update</button></td>
        <td><button onclick=delet(${i}) id="delete">delete</button></td>
    </tr>
        `;
        
  }
    }
    document.getElementById("databody").innerHTML=(dataitems)

  }
  if(searchtype== "category"){
     let dataitems=''
    for(let i=0;i<proarr.length;i++){
     

      if (proarr[i].category.includes(value)){
        dataitems += `
    <tr>
        <td>${i+1}</td>
        <td>${proarr[i].title} </td>
        <td>${proarr[i].price}</td>
        <td>${proarr[i].taxes}</td>
        <td>${proarr[i].ads}</td>
        <td>${proarr[i].discount}</td>
        <td>${proarr[i].total}</td>
        <td>${proarr[i].category}</td>
        <td><button onclick=updatData(${i}) id="update">update</button></td>
        <td><button onclick=delet(${i}) id="delete">delete</button></td>
    </tr>
        `;
        
  }
    }
    document.getElementById("databody").innerHTML=(dataitems)

  }
}