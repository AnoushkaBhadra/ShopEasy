import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

const html = `
<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8"/>

<meta
name="viewport"
content="width=device-width, initial-scale=1.0"
/>

<link
rel="stylesheet"
href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>

<style>

html,
body,
#map{
    height:100%;
    margin:0;
    padding:0;
}

</style>

</head>

<body>

<div id="map"></div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>

var map = L.map("map").setView([22.5726,88.3639],13);

L.tileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
{
    maxZoom:19,
    attribution:"© OpenStreetMap"
}
).addTo(map);

var marker = null;

map.on("click",function(e){

    if(marker){
        map.removeLayer(marker);
    }

    marker = L.circleMarker(e.latlng,{
        radius:10,
        color:"red",
        fillColor:"red",
        fillOpacity:1
    }).addTo(map);

    marker.bindPopup(
        "Latitude: " + e.latlng.lat.toFixed(6) +
        "<br>Longitude: " + e.latlng.lng.toFixed(6)
    ).openPopup();

    window.ReactNativeWebView.postMessage(
        JSON.stringify({
            latitude:e.latlng.lat,
            longitude:e.latlng.lng
        })
    );

});

</script>

</body>
</html>
`;

export default function MapPicker({ onLocationSelected }) {

    function handleMessage(event){

        const coords = JSON.parse(event.nativeEvent.data);

        if(onLocationSelected){
            onLocationSelected(coords);
        }

    }

    return(
        <View style={{flex:1}}>

            <WebView
                originWhitelist={["*"]}
                javaScriptEnabled
                domStorageEnabled
                mixedContentMode="always"
                source={{html}}
                style={{flex:1}}
                onMessage={handleMessage}
            />

        </View>
    );

}