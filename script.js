
let icons = document.querySelector(".icons");
let tabresponsive = document.querySelector(".table-responsive");
let datalist = document.querySelector(".dtlist");
let currentTemp = document.querySelector("#currentTemp");
let state = document.querySelector(".part-left");
let dataListValue = document.querySelector(".form-control");
let btnPre = document.querySelector("#btn-chan-day-pre");
let btnNext = document.querySelector("#btn-chan-day-next");
let loc_data = document.querySelector(".loc-date");
let feelsTemp = document.querySelector(".feelsTemp");
let rain = document.querySelector(".rain");
let humi = document.querySelector(".humi");
let wind = document.querySelector(".wind");
let newDays = [
  { key: "conditions", label: "Durum" },
  { key: "temp", label: "Sıcaklık" },
  { key: "feelslike", label: "Hissedilen Sıcaklık" },
  { key: "feelslikemax", label: "Hissedilen MaxSıcaklık" },
  { key: "feelslikemin", label: "Hissedilen MinSıcaklık" },
  { key: "precip", label: "Yağış" },
  { key: "precipcover", label: "Yağış Örtüsü" },
  { key: "precipprob", label: "Yağış Olasılığı" },
  { key: "humidity", label: "Nem" },
  { key: "dew", label: "çiğ" },
  { key: "moonphase", label: "Ay Evresi" },
  { key: "pressure", label: "Basınç" },
  { key: "severerisk", label: "Ciddi Risk" },
  { key: "snow", label: "Kar" },
  { key: "snowdepth", label: "Kar Derinliği" },
  { key: "solarenergy", label: "Güneş Enerjisi" },
  { key: "solarradiation", label: "Güneş Radyasyonu" },
  { key: "sunrise", label: "Gün Doğumu" },
  { key: "sunset", label: "Gün Batımı" },
  { key: "uvindex", label: "UV Endeksi" },
  { key: "visibility", label: "Görüş Mesafesi" },
  { key: "winddir", label: "Rüzgar" },
  { key: "windspeed", label: "Rüzgar Hızı" }

];
let fetchedData = {};
let option;
let url;
let counter = 0;



let city = 'Ankara';
//Fetch işlemi yapılıyor
function changeUrl(city) {
  const ur = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=days%2Chours%2Ccurrent%2Cevents%2Calerts&key=ZUJSRNTYGEAUFVWADWK4SQHNV&contentType=json`;
  return ur;
}
url = changeUrl(city);
fetchUrl(url);
function fetchUrl(url) {

  async function fetchWeatherJson(url) {
    const response = await fetch(url);
    const weatherdata = await response.json();
    console.log("weatherdata", weatherdata);
    return weatherdata;
  }

  fetchedData = fetchWeatherJson(url);
  fetchedData.then(data => {
    //günlük veriyi tabloya yansıtma
    FillDaysData();
    function FillDaysData(n = 0) {
      let new_col = "";// aksi halde bir sonraki günü tabloda alta basıyor yani üst üste ekliyor bu nedenle her defasında boşaltıyorsun
      for (let x = 0; x < newDays.length; x++) {
        new_col += `
        <div  class="col d-flex flex-column" style="flex: 1 1 14%">
            <div class="header">${newDays[x].label}</div>
            <div class="value" >${data.days[n][newDays[x].key]}</div>
        </div>`
        //tabresponsive.insertAdjacentHTML("beforeend", new_col);
        tabresponsive.innerHTML = new_col;
      }
      currentTemp.textContent = data.days[n].tempmax
      loc_data.innerHTML = `<span>${data.resolvedAddress}   -   ${data.days[n].datetime}</span>`;
      feelsTemp.innerHTML = `<span>${data.days[n].feelslike}°C</span>`;
      rain.innerHTML = `<span>Yağış:${data.days[n].precip}</span>`
      humi.innerHTML = `<span>Nem:${data.days[n].humidity}%</span>`
      wind.innerHTML = `<span>Rüzgar Hızı:${data.days[n].windspeed}km/s</span>`;
    }

    btnNext.addEventListener("click", () => {

      if (counter >= 14) {
        console.log("counter 15 oldu olmaz ");
        return FillDaysData(14);
      }
      counter++;
      console.log(counter)
      FillDaysData(counter);
    });

    btnPre.addEventListener("click", () => {
      console.log("click pre");
      if (counter <= 0) {
        return FillDaysData(counter);
      }
      counter--;
      FillDaysData(counter);

    });

    for (let key of stat) {
      let obj = count.find(value => value.id == key.country_id);//find metodu bulduğu nesneyi döner
      option = `<option value="${key.name},${obj.name}">${obj.name}</option>`
      datalist.insertAdjacentHTML("beforeend", option);
    }

  });
}

//listeden şehir seçme ve ona göre yeni url oluşturup yeni istekte bulunma
dataListValue.addEventListener("change", () => {
  console.log("Changed");
  city = dataListValue.value;
  console.log(city);
  const url = changeUrl(city);
  console.log(url);
  fetchUrl(url);
})







