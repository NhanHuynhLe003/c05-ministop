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

function checkProvider(val, listProvider) {
  for (let k = 0; k < listProvider.length; k++) {
    if (val === listProvider[k].name) return true;
  }
  return false;
}


function minPrice() {
  document.getElementById("min-price");
  return Number(document.getElementById("min-price").value);
}
function maxPrice() {
  let maxPrice = document.getElementById("max-price");
  return Number(maxPrice.value);
}
// sua lai neu menh gia nam tu min -> max thì lấy các element thỏa đkien là xong
function rangePrice(price) {
  let min = minPrice();
  let max = maxPrice();

  if (max > min) {
    if (price >= min && price <= max) return true;
    else return false;
  } else if (max == 0 && min == 0) {
    return true;
  } else return false;
}


function searchBar(books) {
  let bookList = document.getElementById("list");
  let bookItem = bookList.children;
  let value = document.getElementById("search").value;
  let list = document.getElementById("list");
  let item = list.getElementsByClassName("item");
  let providerList = listProvider(books);
  /**hien thi sach bang ten */
  let myId = [];

  for (let k = 0; k < books.length; k++) {
    let price = Number(item[k].children[2].innerText);
    if(providerList[k] != undefined){
      myId.push(providerList[k].id);
    }
    if (
      kiemTraSach(value, books, k) &&
      rangePrice(price) &&
      checkProvider(value, providerList)
    ) {
      bookItem[k].style.display = "block";
    } else bookItem[k].style.display = "none";
    if (value == '') {
      bookItem[k].style.display = "none";
      for(let m=0;m<providerList.length; m++){
        let id = myId[m];
        if(books[id-1] == books[k]){
          bookItem[k].style.display = "block";
        }
      }
      
    } 
  }
}


function handlePriceOfCheckBox(listProvider, min, max) {
  let result = listProvider.filter(function (priceBook) {
    if (max > 0 && min < max) {
      return priceBook.price >= min && priceBook.price <= max;
    } else {
      return priceBook;
    }
  });
  return result;
}

/**kiem tra sach nha cung cap */

function listProvider(books) {
  let result = [];
  let provider = document.querySelectorAll("input[type=checkbox]");

  books.forEach(function (book) {
    if (
      provider[0].checked == true &&
      provider[1].checked == false &&
      provider[2].checked == false
    ) {
      if (book.provider == "Fahasha") result.push(book);
    } else if (
      provider[1].checked == true &&
      provider[2].checked == false &&
      provider[0].checked == false
    ) {
      if (book.provider == "Tuổi trẻ") result.push(book);
    } else if (
      provider[2].checked == true &&
      provider[0].checked == false &&
      provider[1].checked == false
    ) {
      if (book.provider == "Kmin Books") result.push(book);
    } else if (
      provider[0].checked == true &&
      provider[1].checked == true &&
      provider[2].checked == false
    ) {
      if (book.provider == "Fahasha") result.push(book);
      if (book.provider == "Tuổi trẻ") result.push(book);
    } else if (
      provider[0].checked == false &&
      provider[1].checked == true &&
      provider[2].checked == true
    ) {
      if (book.provider == "Tuổi trẻ") result.push(book);
      if (book.provider == "Kmin Books") result.push(book);
    } else if (
      provider[0].checked == true &&
      provider[1].checked == false &&
      provider[2].checked == true
    ) {
      if (book.provider == "Fahasha") result.push(book);
      if (book.provider == "Kmin Books") result.push(book);
    } else {
      if (book.provider == "Fahasha") result.push(book);
      if (book.provider == "Tuổi trẻ") result.push(book);
      if (book.provider == "Kmin Books") result.push(book);
    }
  });

  result = handlePriceOfCheckBox(result, minPrice(), maxPrice());

  return result;
}

searchEnter();
searchBtn(books);
renderPriceAndName(books);
