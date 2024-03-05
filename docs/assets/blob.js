function degreeToRadians(degree){
  return degree / (180.0 / Math.PI);
}

function RadiansToDegree(radians){
  return radians * (180.0 / Math.PI);
}

function determineQuadrant(angleInDegree){
  let reminder = angleInDegree % 90;
  return (angleInDegree - reminder) / 90;
}

// https://github.com/lokesh-coder/blobshape/blob/master/index.js
function createSvgPath (points) {
  let svgPath = "";
  var mid = [
    (points[0][0] + points[1][0]) / 2,
    (points[0][1] + points[1][1]) / 2,
  ];
  svgPath += "M" + mid[0] + "," + mid[1];

  for (var i = 0; i < points.length; i++) {
    var p1 = points[(i + 1) % points.length];
    var p2 = points[(i + 2) % points.length];
    mid = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
    svgPath += "Q" + p1[0] + "," + p1[1] + "," + mid[0] + "," + mid[1];
  }
  svgPath += "Z";
  return svgPath;
};

function createBlobSvg(
  element,       // DOM element which determines center area
  minPoints,     // number of minimum points for blob shape, e.g. 5
  maxPoints,     // number of maximum points for blob shape, e.g. 7
  minDegree,     // minimum degree between two points
  minDistance,   // minumum distance between point and element's border box
  maxDistance    // maximum distance between point and element's border box
){
  let numberOfPoints = Math.floor(Math.random() * (maxPoints - minPoints)) + minPoints;
  if (maxPoints * minDegree > 360) {
    throw Error("maxPoints * minDegree must be below 360.");
  }
  let pointDegrees = [];
  let sumRandomDegree = 0.0;
  for (let i = 0; i < numberOfPoints + 1; i++) {
    pointDegrees[i] = 1 + Math.random();
    sumRandomDegree += pointDegrees[i];
  }
  let dynamicDegree = 360.0 - numberOfPoints * minDegree;
  for (let i = 0; i < numberOfPoints; i++) {
    pointDegrees[i] = minDegree + pointDegrees[i] / sumRandomDegree * dynamicDegree;
  }

  let elementWidth = element.offsetWidth;
  let elementHeight = element.offsetHeight;

  let angleBetweenXaxisAndCornerOfElement = RadiansToDegree(Math.atan((elementHeight / 2) / (elementWidth / 2)));
  let points = [];
  let currentDegree = 0.0;
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${elementWidth + 2 * maxDistance} ${elementHeight + 2 * maxDistance}`);
  for (let i = 0; i < numberOfPoints; i++) {
    currentDegree += pointDegrees[i];
    let quadrant = determineQuadrant(currentDegree);
    let degreeInQuadrant = currentDegree - 90.0 * quadrant;
    let flipResultX = false;
    let flipResultY = false;
    switch (quadrant) {
      case 0:
        break;
      case 1:
        flipResultY = true;
        degreeInQuadrant = 90.0 - degreeInQuadrant;
        break;
      case 2:
        flipResultX = true;
        flipResultY = true;
        break;
      case 3:
        flipResultX = true;
        degreeInQuadrant = 90.0 - degreeInQuadrant;
        break;
      default:
        console.log("Reached default of switch case :(");
        break;
    }
    let distanceBetweenElementCenterAndElementBoundingBox = 0.0123;
    if (degreeInQuadrant === 0.0) {
      distanceBetweenElementCenterAndElementBoundingBox = elementHeight / 2;
    } else if (degreeInQuadrant === 90.0) {
      distanceBetweenElementCenterAndElementBoundingBox = elementWidth / 2;
    } else if (degreeInQuadrant < 90.0 - angleBetweenXaxisAndCornerOfElement) {
      distanceBetweenElementCenterAndElementBoundingBox = (elementHeight / 2) *
        (Math.sin(degreeToRadians(90.0)) / Math.sin(degreeToRadians(90.0 - degreeInQuadrant)));
    } else {
      distanceBetweenElementCenterAndElementBoundingBox = (elementWidth / 2) *
        (Math.sin(degreeToRadians(90.0)) / Math.sin(degreeToRadians(degreeInQuadrant)));
    }
    let pointLength = distanceBetweenElementCenterAndElementBoundingBox + Math.random() * maxDistance;
    let deltaX = pointLength *
      (Math.sin(degreeToRadians(degreeInQuadrant)) / Math.sin(degreeToRadians(90.0)));
    let deltaY = pointLength *
      (Math.sin(degreeToRadians(90.0 - degreeInQuadrant)) / Math.sin(degreeToRadians(90.0)));
    if (flipResultX) deltaX *= -1;
    if (flipResultY) deltaY *= -1;
    let pointX = maxDistance + elementWidth / 2 + deltaX;
    let pointY = maxDistance + elementHeight / 2 + deltaY;
    points[i] = [pointX, pointY];
  }
  svg.setAttributeNS(null, 'style', `position: absolute; left: -${maxDistance}px; top: -${maxDistance}px; right: -${maxDistance}px; bottom: -${maxDistance}px;`);
  let path = document.createElementNS("http://www.w3.org/2000/svg","path");
  path.setAttributeNS(null, "d", createSvgPath(points));
  path.setAttributeNS(null, 'class', 'blob' );
  svg.appendChild(path);
  element.prepend(svg);
}

function createDefaultBlob(element){
  createBlobSvg(
    element,
    20,
    30,
    10,
    0,
    20
  );
}
