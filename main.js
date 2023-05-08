console.log("Hello World");

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";
import earth_diffuse_texture_img from "./src/assets/textures/earth_diffuse_texture.jpg";
import earth_bump_texture_img from "./src/assets/textures/earth_bump_map_texture.jpg";

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const scene = new THREE.Scene();

// Adding Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width, sizes.height, 0.1, 1000);
camera.position.z = 100;
scene.add(camera);

// Adding Shpere
const shpereGeo = new THREE.SphereGeometry(40, 64, 64);
const earthMaterial = new THREE.MeshPhongMaterial();
const earth = new THREE.Mesh(shpereGeo, earthMaterial);
scene.add(earth);

// Adding Light
const light = new THREE.AmbientLight();
light.position.y = 100;
scene.add(light);

const loader = new THREE.TextureLoader();
// loader
//   .loadAsync(earth_diffuse_texture)
//   .then((texture) => {
//     earthMaterial.map = texture;
//     console.log(texture)
//   })
//   .catch((err) => {
//     console.log(err);
//   });
const earth_diffusion_texture = loader.load(earth_diffuse_texture_img);
earthMaterial.map = earth_diffusion_texture;

const earth_bump_texture = loader.load(earth_bump_texture_img);
earthMaterial.bumpMap = earth_bump_texture;
earthMaterial.bumpScale = 50;

console.log(earthMaterial.map);

const canvas = document.querySelector("canvas");

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const animate = () => {
  sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  renderer.render(scene, camera);
  renderer.setSize(sizes.width, sizes.height);
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  window.requestAnimationFrame(animate);
  controls.update();
};

animate();
