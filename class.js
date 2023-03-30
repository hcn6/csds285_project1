const scheduleTable = document.getElementById("schedule");
const data_url = "http://eecslab-22.case.edu/~hcn6/csds285_project1/backend/index.php/class/schedule"
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