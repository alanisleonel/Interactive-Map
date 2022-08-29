//create my map
const myMap = L.map('map',{
    center: [41.881832, -87.623177],
    zoom: 13,
});
//adding openstreetmap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(myMap);
//adding a geolocation marker

const marker = L.marker([41.881832, -87.623177])
marker.addTo(myMap).bindPopup('<pl><b>You are here</b></pl>').openPopup()

// getting users location

function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
  
    mapLink.href = '';
    mapLink.textContent = '';
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
      myMap.setView([latitude, longitude]);
      //adding marker
      const marker = L.marker([latitude, longitude]).addTo(myMap)
    }
    navigator.geolocation.getCurrentPosition(success)
  }
  
  document.querySelector('#find-me').addEventListener('click', geoFindMe);

  //window load
  window.onload = async () => {
    const coords = await geoFindMe()
}

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'fsq35lO2O8bQqc0QUm9E/WzxUWZJLFdPvnDpQNQDVWTc02w='
    }
  };
  
  fetch('https://api.foursquare.com/v3/places/search?query=coffee', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  