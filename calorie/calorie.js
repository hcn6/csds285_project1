const intakeList = [];

function queryNutritionFact() {
    // const local_url = "http://localhost:8000/calories/nutritionFact";
    const data_url = "https://csds285-project1.herokuapp.com/index.php/calories/nutritionFact";
    const vm_url = "http://eecslab-22.case.edu/~hcn6/csds285_project1/backend/index.php/calories/nutritionFact";
    const inputText = document.getElementById("food").value;
    fetch(vm_url, {
        method: 'POST',
        body: JSON.stringify({ "query": inputText }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    })
        .then(response => response.json())
        .then(data => {
            clearContentById('result');
            createTable(data);
        })
}

// Function to create a table from JSON data
function createTable(data) {
    // Get the container element
    const container = document.getElementById("result");

    // Create a table element
    const table = document.createElement("table");

    // Create the table header row
    const headerRow = document.createElement("tr");

    // Loop through the keys of the first object to create the column headers
    Object.keys(data[0]).forEach(key => {
        const headerCell = document.createElement("th");
        const headerText = document.createTextNode(key);
        headerCell.appendChild(headerText);
        headerRow.appendChild(headerCell);
    });

    // Add the header row to the table
    table.appendChild(headerRow);

    // Loop through the JSON data to create the table rows
    data.forEach(obj => {
        const row = document.createElement("tr");

        // Loop through the object properties to create the table cells
        Object.keys(obj).forEach(key => {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(obj[key]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        });

        // Add the row to the table
        table.appendChild(row);
    });

    // Add the table to the container element
    const totalCaloriesElement = document.createElement("p");
    const content = document.createTextNode(`Total Calories: ${getTotalCalories(data)}`)
    totalCaloriesElement.appendChild(content)
    container.appendChild(totalCaloriesElement)
    container.appendChild(table);
    
}

function getTotalCalories(data) {
    const initialValue = 0;

    const totalCalories = data.reduce((accumulator, current) => accumulator + current['calories'], initialValue);
    return totalCalories;
}

function clearContentById(elementID) {
    var div = document.getElementById(elementID);
      
    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
}