const scheduleTable = document.getElementById("schedule");
const data_url = "http://eecslab-22.case.edu/~hcn6/csds285_project1/backend/index.php/sport/soccerSchedule";
fetch(data_url)
    .then((response) => response.json())
    .then((data) => {
        scheduleTable.innerHTML = "";
        soccer_data = data.football
        console.log(soccer_data)
        soccer_data.forEach((match) => {
            const row = document.createElement("tr");
            // console.log(match.date)
            league = match.tournament
            date = match.start.split(" ")[0]
            start = match.start.split(" ")[1]
            home = match.match.split("vs")[0].trim()
            away = match.match.split("vs")[1].trim()

            row.innerHTML = `
                  <td>${league}</td>
                  <td>${date}</td>
                  <td>${start}</td>
                  <td>${home}</td>
                  <td>${away}</td>
                `;
            scheduleTable.appendChild(row);
        });
    })
    .catch((error) => {
        console.log(error)
        scheduleTable.innerHTML = `
                <tr>
                  <td colspan="4">Error loading schedule.</td>
                </tr>
              `;
    });