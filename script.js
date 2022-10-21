// import books from "./data.js";
// console.log(books);

let books = [
  {
    id: 1,
    name: "Luật tâm thức",
    price: 220000,
    provider: "Fahasha",
  },
  {
    id: 2,
    name: "Chiến binh cầu vồng",
    price: 140000,
    provider: "Fahasha",
  },
  {
    id: 3,
    name: "Nghệ thuật tập trung",
    price: 90000,
    provider: "Tuổi trẻ",
  },
  {
    id: 4,
    name: "Bye Béo",
    price: 305000,
    provider: "Kmin Books",
  },
  {
    id: 5,
    name: "Sát thủ bán hàng",
    price: 180000,
    provider: "Fahasha",
  },
  {
    id: 6,
    name: "Hoàng tử bé",
    price: 50000,
    provider: "Kmin Books",
  },
  {
    id: 7,
    name: "Tâm lý học tội phạm",
    price: 400000,
    provider: "Kmin Books",
  },
  {
    id: 8,
    name: "Hiểu về trái tim",
    price: 130000,
    provider: "Tuổi trẻ",
  },
];

/**tao mau */

function clickToChange(color, value) {
  let header = document.querySelector("header");
  color.onclick = function () {
    header.style.background = value;
  };
}

function changeColor() {
  let colors = document.getElementById("colors");
  let yellow = colors.children[0];
  clickToChange(yellow, "#fcbf16");
  let red = colors.children[1];
  clickToChange(red, "#992154");

  let blue = colors.children[2];
  clickToChange(blue, "#173451");

  let gradient = colors.children[3];
  clickToChange(gradient, "linear-gradient(to right, #fcbf16, #992154)");
}

changeColor();

/** tim sach bang ten*/

function kiemTraSach(val, books, i) {
  if (books[i].name == val) {
    return true;
  }
  return false;
}

function searchBtn(books) {
  let btn = document.getElementById("apply-price-filter");
  btn.onclick = function () {
    searchBar(books);
    console.log(listProvider(books));
    
  };
}

function searchEnter() {
  let enter = document.getElementById("search");
  enter.onkeydown = function (e) {
    if (e.key == "Enter") searchBar(books);
  };
}

function renderPriceAndName(books) {
  let list = document.getElementById("list");
  let item = list.getElementsByClassName("item");
  for (let i = 0; i < item.length; i++) {
    let price = item[i].children[2];
    let name = item[i].children[1];
    name.innerText = books[i].name;
    price.innerText = books[i].price;
  }
}

function rangePrice(price) {
  let minPrice = document.getElementById("min-price");
  let maxPrice = document.getElementById("max-price");

  if (Number(maxPrice.value) > Number(minPrice.value)) {
    if (price >= Number(minPrice.value) && price <= Number(maxPrice.value))
      return true;
    else return false;
  } else if (Number(maxPrice.value) == 0 && Number(minPrice.value) == 0)
    return true;
  else return false;
}

function searchBar(books) {
  let bookList = document.getElementById("list");
  let bookItem = bookList.children;
  let value = document.getElementById("search").value;
  let list = document.getElementById("list");
  let item = list.getElementsByClassName("item");
  let providerList = listProvider(books);
  /**hien thi sach bang ten */
  for (let k = 0; k < bookItem.length; k++) {
    let price = Number(item[k].children[2].innerText);

    if (kiemTraSach(value, books, k) && rangePrice(price) && checkProvider(value, providerList)) {
      bookItem[k].style.display = "block";
    } else if (value == "" && rangePrice(price)){
      handleCheckBox(books);
    }
    else bookItem[k].style.display = "none";
  }
}
/**kiem tra sach nha cung cap */

function listProvider(books){
  let result = [];
  let provider = document.querySelectorAll('input[type=checkbox]');
  if(provider[0].checked == true) {
      books.filter(function(book){
      if(book.provider == 'Fahasha') result.push(book);
    });
  } 
  if(provider[1].checked == true) {
    books.filter(function(book){
    if(book.provider == 'Tuổi trẻ') result.push(book);
  })
  } 
  if(provider[2].checked == true){
    books.filter(function(book){
      if(book.provider == 'Kmin Books') result.push(book);
    })
  }

  if(result.length == 0) {
    for(let i = 0; i<books.length ;i++){
      result.push(books[i])
    }
  }
return result;
}


function checkProvider(val, listProvider){
  for(let k=0; k<listProvider.length ;k++){
    if(val === listProvider[k].name) return true;
  }
  return false
}

function handleCheckBox(books){
  let bookList = document.getElementById("list");
  let bookItem = bookList.children;
  let checkBox = document.querySelectorAll('input[type=checkbox]');
  let selectedBook = listProvider(books);
  for(let j =0;j<books.length; j++){
    for(let i=0; i<selectedBook.length ; i++){
      let id = selectedBook[i].id - 1;
      if(checkBox[0].checked && checkBox[1].checked == false && checkBox[2].checked == false) { 
        bookItem[id].style.display = "block";
        if(j != (id)) bookItem[j].style.display = "none";
      }
      else if(checkBox[0].checked ==false && checkBox[1].checked && checkBox[2].checked == false) { 
        bookItem[id].style.display = "block";
        if(j != (id)) bookItem[j].style.display = "none";
      }
      else if(checkBox[0].checked ==false && checkBox[1].checked == false && checkBox[2].checked) { 
        bookItem[id].style.display = "block";
        if(j != (id)) bookItem[j].style.display = "none";
      }
      else if(checkBox[0].checked && checkBox[1].checked && checkBox[2].checked == false) { 
        bookItem[id].style.display = "block";
        if(j != (id)) bookItem[j].style.display = "none";
      }
      else if(checkBox[0].checked ==false && checkBox[1].checked && checkBox[2].checked) { 
        bookItem[j].style.display = "none";
        bookItem[id].style.display = "block";
        bookItem[books.length-1].style.display = "block";
      }
      else if(checkBox[0].checked && checkBox[1].checked == false && checkBox[2].checked) { 
        bookItem[id].style.display = "block";
        if(j != (id)) bookItem[j].style.display = "none";
      }
      else {
        bookItem[id].style.display = "block";
      }
    }
}

}

searchEnter();
searchBtn(books);
renderPriceAndName(books);
