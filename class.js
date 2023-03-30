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
                assignmentList.push(
                    {
                        "classCode": classCode,
                        "homework": assignment['name'],
                        "deadline": new Date(assignment["due_at"])
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
              <td>${assignment['deadline']}</td>
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