
let data;

//fetches posts
function getPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts')
   .then(response => response.json())
   .then(json => {
     data = json;
     clearTable();
     generate_table();
   });
}

//Sorts the data Alphabetically
function sortDataAlphabetically(){
  data.sort(function(a, b) {
    var textA = a.title.toUpperCase();
    var textB = b.title.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  clearTable();
  generate_table();
}

//Sort the data by ID
function sortDataById(){
  data.sort(function(a, b) {
    var textA = a.title.toUpperCase();
    var textB = b.title.toUpperCase();
    if (a.userId !== b.userId) {
        return a.id - b.id
    }
    if (textA === textB) {
      return 0;
    }
    return textA > textB ? 1 : -1;
  });
  clearTable();
  generate_table();
}


//Clear the table before sorting
function clearTable()
{
  document.getElementById('myTable').innerHTML = "";
}


function generate_table() {
  var myHeaders = ['userId','Title','Body'];
  // get the reference for the body
  var myTable = document.getElementById("myTable");

  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");

  var tblHead = document.createElement("thead");
  var row = document.createElement("tr");
  for (var i = 0; i < myHeaders.length; i++) {
    var header = document.createElement("th");
    var cellText = document.createTextNode(myHeaders[i]);
    header.appendChild(cellText);
    row.appendChild(header);
  }

  tblHead.appendChild(row);

  tbl.classList.add('paleBlueRows');
  var tblBody = document.createElement("tbody");

  // creating all cells
  for (var i = 0; i < data.length; i++) {
    // creates a table row
    var row = document.createElement("tr");

    for (var j = 0; j < 3; j++) {
      var cell = document.createElement("td");
      if(j==0){
        var cellText = document.createTextNode(data[i].userId);
      }else if(j==1){
        var cellText = document.createTextNode(data[i].title);
      }else{
        var cellText = document.createTextNode(data[i].body);
    }

      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblHead);
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  myTable.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
}
