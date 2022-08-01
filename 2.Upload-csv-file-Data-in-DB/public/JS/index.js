//Upload a csvfile in DB from forntend .

document.getElementById("csv_form").addEventListener("submit", function (e) {
  e.preventDefault();

  const userFile = document.getElementById("file").files[0];

  const formData = new FormData();
  formData.append("docs", userFile, "docs");

  fetch("http://localhost:8080/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});



//Fetching CSV-Data from DB and displaying it in HTML-Table

document
  .getElementById("csv_button")
  .addEventListener("click", async function fillData() {
    let table = document.querySelector("table");
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const response = await fetch("http://localhost:8080/getcsvdata");
    const data = await response.json();

    console.log(data);

    //clear out table
    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = "";

    //populating header

    for (const headerText in data[0]) {
      const HeaderElement = document.createElement("th");
      HeaderElement.textContent = headerText;
      tableHead.querySelector("tr").appendChild(HeaderElement);
    }

    for (let i = 0; i < data.length; i++) {
      const obj = Object.values(data[i]);
      const rowElement = document.createElement("tr");
      for (const cellText of obj) {
        const cellElement = document.createElement("td");
        cellElement.textContent = cellText;
        rowElement.appendChild(cellElement);
      }
      tableBody.appendChild(rowElement);
    }
  });

