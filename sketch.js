// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const distanceScale = 250;
const sizeScale = 10;
const degToRad = 0.0174533;

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
};

function createSpotlights(scene) {
  var color = 0xffffff;
  var intensity = 5;
  var distance = 25;
  var angle = Math.PI / 7;

  new Array(6).fill("").forEach((item, i) => {
    var spotlight = new THREE.SpotLight(color, intensity, distance, angle);
    var value = i % 2 === 0 ? 25 : -25;

    spotlight.position.set(i < 2 ? value : 0, i >= 2 && i < 4 ? value : 0, i >= 4 ? value : 0);
    scene.add(spotlight);
  });
}

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
  });

  // WebGL background color
  renderer.setClearColor("#000", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100000);
  camera.position.set(1000, 1000, -5000);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  // LIGHTING
  const light = new THREE.PointLight("white", 1.25);
  light.position.set(0, 0, 0);
  scene.add(light);

  // illuminate the sun
  createSpotlights(scene);

  // TEXTURES
  const loader = new THREE.TextureLoader();

  const planets = [
    {
      name: "mercury",
      scale: 0.382,
      distance: 0.39,
      rotation: 58.65,
      revolution: 0.24,
      inclination: 0.0,
      orbitalInclination: 7.0,
    },
    {
      name: "venus",
      scale: 0.949,
      distance: 0.72,
      rotation: -243,
      revolution: 0.62,
      inclination: 177.4,
      orbitalInclination: 3.4,
    },
    {
      name: "earth",
      scale: 1,
      distance: 1,
      rotation: 1,
      revolution: 1,
      inclination: 23.45,
      orbitalInclination: 0.0,
    },
    {
      name: "mars",
      scale: 0.532,
      distance: 1.52,
      rotation: 1.03,
      revolution: 1.88,
      inclination: 23.98,
      orbitalInclination: 1.9,
    },
    {
      name: "jupiter",
      scale: 11.209,
      distance: 5.2,
      rotation: 0.41,
      revolution: 11.86,
      inclination: 3.08,
      orbitalInclination: 1.3,
    },
    {
      name: "saturn",
      scale: 9.44,
      distance: 9.54,
      rotation: 0.44,
      revolution: 29.46,
      inclination: 26.73,
      orbitalInclination: 2.5,
    },
    {
      name: "uranus",
      scale: 4.007,
      distance: 19.18,
      rotation: -0.72,
      revolution: 84.01,
      inclination: 97.92,
      orbitalInclination: 0.8,
    },
    {
      name: "neptune",
      scale: 3.883,
      distance: 30.06,
      rotation: 0.72,
      revolution: 164.8,
      inclination: 28.8,
      orbitalInclination: 1.8,
    },
  ];

  const axis = new THREE.Vector3(0.5, 0, 0.5).normalize();

  const planetGroupArray = planets.map((planet) => new THREE.Group());

  const planetTextureArray = planets.map((planet) => loader.load(`assets/${planet.name}.jpg`));

  const planetMaterialArray = planetTextureArray.map(
    (planetTexture) => new THREE.MeshStandardMaterial({ map: planetTexture })
  );

  const planetMeshArray = planetMaterialArray.map((planetMaterial) => new THREE.Mesh(geometry, planetMaterial));

  planets.forEach((planet, i) => {
    planetMeshArray[i].position.set(
      -(distanceScale * planet.distance * Math.cos(degToRad * planet.orbitalInclination)),
      distanceScale * planet.distance * Math.sin(degToRad * planet.orbitalInclination),
      0
    );
    planetMeshArray[i].scale.setScalar(planet.scale * sizeScale);
    planetMeshArray[i].rotateOnAxis(axis, degToRad * planet.inclination);

    planetGroupArray[i].rotateOnAxis(axis, degToRad * planet.orbitalInclination);

    planetGroupArray[i].add(planetMeshArray[i]);
    scene.add(planetGroupArray[i]);
  });

  // Setup a material
  const sunMaterial = new THREE.MeshNormalMaterial({
    flatShading: true,
    // map: loader.load(`assets/sun.jpg`),
  });

  // Setup a mesh with geometry + material
  const sunMesh = new THREE.Mesh(geometry, sunMaterial);
  sunMesh.position.set(0, 0, 0);
  sunMesh.scale.setScalar(109);
  scene.add(sunMesh);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      sunMesh.rotation.y = time / 27;

      planetMeshArray.forEach((planetMesh, i) => {
        planetMesh.rotation.y = time / planets[i].rotation;
      });

      planetGroupArray.forEach((planetGroup, i) => {
        planetGroup.rotation.y = time / planets[i].revolution;
      });

      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
