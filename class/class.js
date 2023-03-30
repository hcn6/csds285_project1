const scheduleTable = document.getElementById("schedule");
const local_url = "http://localhost:8000/class/schedule";
const data_url = "https://csds285-project1.herokuapp.com/index.php/class/schedule"
fetch(data_url)
    .then((response) => response.json())
    .then((data) => {
        const assignmentList = [];
        data.forEach((classObj) => {
            const classCode = classObj['classCode'];
            classObj['assignments'].forEach((assignment) => {
                const tempDate = new Date(assignment["due_at"]);

                assignmentList.push(
                    {
                        "classCode": classCode,
                        "homework": assignment['name'],
                        "deadline": tempDate,

                    })
            })
        })
        return assignmentList.sort((a, b) => a['deadline'] - b['deadline']);
    })
    .then((assignmentList) => {
        scheduleTable.innerHTML = "";
        assignmentList.forEach((assignment) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${assignment['classCode']}</td>
              <td>${assignment['homework']}</td>
              <td>${assignment['deadline'].toDateString()}</td>
              <td>${`${getDaysFromCurrent(assignment['deadline'])} days`}</td>
            `;
            scheduleTable.appendChild(row);
        })
    })
    .catch((error) => {
        console.log(error)
        scheduleTable.innerHTML = `
                <tr>
                  <td colspan="4">Error loading schedule.</td>
                </tr>
              `;
    });

function getDaysFromCurrent(date) {
    let timeDiff = date.getTime() - new Date().getTime();
      
    // To calculate the no. of days between two dates
    let daysDiff = timeDiff / (1000 * 3600 * 24);
    return Math.round(daysDiff);
}