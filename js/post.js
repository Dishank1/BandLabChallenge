
let data;

function getPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts')
   .then(response => response.json())
   .then(json => {
     data = json;
     generate_table();
   });
}

function sortDataAlphabetically(){
  data.sort(function(a, b) {
    var textA = a.title.toUpperCase();
    var textB = b.title.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  clearTable();
  generate_table();
}
// ||  a.name.localeCompare(b.name);
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
  // return a.userId - b.userId || sortDataAlphabetically()
  });
  clearTable()
  generate_table()
  // for (var i = 0; i < data.length; i++) {
  //   console.log('testing: '+JSON.stringify(data[i]));
  // }
}

function clearTable()
{
    document.getElementById('myTable').innerHTML = "";
}


function generate_table() {
//  getPosts().then(function(res){
  //console.log('data: '+data);
  // get the reference for the body
  var myTable = document.getElementById("myTable");

  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // creating all cells
  for (var i = 0; i < data.length; i++) {
    // creates a table row
    var row = document.createElement("tr");

    for (var j = 0; j < 3; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
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
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  myTable.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
  //});
}

// console.log('Hello World');
