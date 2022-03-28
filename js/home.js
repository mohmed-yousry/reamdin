let table = document.querySelector("table tbody");
fetch(
  "https://api.aladhan.com/v1/hijriCalendarByAddress?address=Cairo,%20Egypt&method=2&month=09&year=1443"
)
  .then((get) => get.json())
  .then((amsic) => {
    amsic.data.map((day) => {
      let contentTr = document.createElement("tr");
      contentTr.className = `mt-3`;
      contentTr.innerHTML = `
            <td>${
              day.date.hijri.day.startsWith("0")
                ? day.date.hijri.day.slice(1)
                : day.date.hijri.day
            }</td>
            <td>${
              day.date.gregorian.day.startsWith("0")
                ? day.date.gregorian.day.slice(1)
                : day.date.gregorian.day
            }  ${
        day.date.gregorian.month.en.includes("April") ? "ابريل" : "مايو"
      }</td>
            <td>${day.date.hijri.weekday.ar}</td>
            <td>${
              day.timings.Imsak.includes("(EET)")
                ? day.timings.Imsak.slice(0, 6)
                : ""
            }</td>
            <td>${
              day.timings.Fajr.includes("(EET)")
                ? day.timings.Fajr.slice(0, 6)
                : ""
            }</td>
            <td>${
              day.timings.Maghrib.includes("(EET)")
                ? day.timings.Maghrib.slice(0, 6)
                : ""
            }</td>
      `;
      table.appendChild(contentTr);
    });
  });
