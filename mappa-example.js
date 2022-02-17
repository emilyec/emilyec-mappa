<!DOCTYPE html>
<html lang="en">

<head>
  <title>Basic Mappa Tutorial</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.min.js" type="text/javascript"></script>
  <script src="https://unpkg.com/mappa-mundi/dist/mappa.js" type="text/javascript"></script>
</head>

<body>
  <script>
let myMap;
let canvas;
const mappa = new Mappa('Leaflet');
//Map options
const options ={
lat: 49.261911,
lng: -123.250272,
zoom: 3,
style: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
}

//p5.js setup
function setup(){
  canvas = createCanvas(640,640);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas)



//Load the meteorite data
meteorites = loadTable('Meteorite_Landings.csv', 'csv', 'header');

  myMap.onChange(drawMeteorites);
    fill(70, 203,31);
  	stroke(100);
}


function draw(){
}

// Draw the meteorites
function drawMeteorites() {
  clear();

  for (let i = 0; i < meteorites.getRowCount(); i++) {
    const latitude = Number(meteorites.getString(i, 'reclat'));
    const longitude = Number(meteorites.getString(i, 'reclong'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      const pos = myMap.latLngToPixel(latitude, longitude);

      let size = meteorites.getString(i, 'mass (g)');
      size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
	     stroke(240, 158, 40);
       fill(224, 198, 52);
	     ellipse(pos.x, pos.y, size, size);
/*//Label the meteorites when mouse over the point.
	  let massLabel = meteorites.getString(i, 'mass (g)');
	  let nameLabel = meteorites.getString(i, 'name');
	  let mapLabels = nameLabel+ "\n" + massLabel + " g";
	  fill(255);
	  stroke(0);
	  textSize(10);
	  /*if (mouseX >= pos.x && mouseX <= pos.x && mouseY >= pos.y && mouseY <= pos.y){*/
	  /*text(mapLabels, pos.x, pos.y);
	  /*} else {}*/
		}
	}
}

  </script>
</body>

</html>
