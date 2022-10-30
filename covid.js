var worldData = "";
worldInit();
worldCountries();
countryInit();
var countryInit = "";
function worldInit() {
  var url = "https://api.covid19api.com/summary";
  $.get(url, function (worldData) {
    percentageOfWorldDeath =
      (worldData.Global.TotalConfirmed / worldData.Global.TotalDeaths) * 100;
    worldData = `
            <td>${worldData.Global.TotalConfirmed}</td>
            <td>${worldData.Global.TotalRecovered}</td>
            <td>${worldData.Global.TotalDeaths}</td>
            <td>${percentageOfWorldDeath}</td>
    `;
    $("#worldData").html(worldData);
  });
}

async function worldCountries() {
  var url = "https://api.covid19api.com/countries";
  $.get(url, function (selectedCountry) {
    for (
      var noOfCountries = 0;
      noOfCountries <= selectedCountry.length - 1;
      noOfCountries++
    ) {
      $("#selectCountry").append(
        "<option value = " +
          selectedCountry[noOfCountries].Country +
          ">" +
          selectedCountry[noOfCountries].Country +
          "</option>"
      );
    }
  });
}

function countryInit() {
  var url = "https://api.covid19api.com/summary";

  $.get(url, function (countryData) {
    for (var count = 0; count <= countryData.Countries.length; count++) {
      var selected = $("#selectCountry").find("option:selected").text();
      if (countryData.Countries[count].Country == selected) {
        var percentageOfCountryDeath =
          (countryData.Countries[count].TotalConfirmed /
            countryData.Countries[count].TotalDeaths) *
          100;
        countryData = `
            <td>${countryData.Countries[count].TotalConfirmed}</td>
            <td>${countryData.Countries[count].TotalRecovered}</td>
            <td>${countryData.Countries[count].TotalDeaths}</td>
            <td>${percentageOfCountryDeath}</td>
    `;
        $("#countryData").html(countryData);
        break;
      }
    }
  });
}
