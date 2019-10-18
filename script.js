let myKey = "1ae38cb9c85a8bd154cd073a32fcb1d0"
let lat = 0
let lon = 0
let storedResponse;
const CORSproxy = "https://cors-anywhere.herokuapp.com/"
let urlData = "https://flickr.com/services/rest/?api_key=" + myKey + "&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=" + lat + "&lon=" + lon + "&text=dog"


function getLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude
        lon = position.coords.longitude
        console.log(lat, lon)
    })
}
getLocation();


window.fetch(CORSproxy + urlData)
    .then(response => response.json())
    .then(responseData => {
        storedResponse = responseData
        console.log(storedResponse)
        // return storedResponse
    })
    .then(function () {
        constructImageURL()
    })


function displayURLImage(imageURL) {
    document.getElementById("image").src = imageURL
    console.log(imageURL)
}
// displayURLImage()


let count = 0


function constructImageURL() {
    let imageURL;
    count++
    if (count === 5) {
        count = 0
    }
    // for (let i = 0; i < 5; i++) {
        console.log(storedResponse.photos)
        let farmId = storedResponse.photos.photo[count].farm
        let serverId = storedResponse.photos.photo[count].server
        let id = storedResponse.photos.photo[count].id
        let secret = storedResponse.photos.photo[count].secret
        imageURL = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`
        // return "https://farm" + photoObj.farm +
        //         ".staticflickr.com/" + photoObj.server +
        //         "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
        console.log(imageURL)
        displayURLImage(imageURL)
        // console.log(displayURLImage(imageURL))
    // }
    return imageURL

}
// constructImageURL(imageURL);


document.getElementById("button").addEventListener("click", constructImageURL)