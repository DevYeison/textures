import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let currentMount = null;

//Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, 100 / 100, 0.1, 1000);
camera.position.z = 8;
scene.add(camera);

//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });

//Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 0, 0);
controls.enableDamping = true;

//Resize
const resize = () => {
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
    camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
//Textures
const textureLoader = new THREE.TextureLoader();
const map = textureLoader.load('./bricks/Wall_Stone_010_basecolor.jpg');
const aoMap = textureLoader.load('./bricks/Wall_Stone_010_ambientOcclusion.jpg');
const roughnessMap = textureLoader.load('./bricks/Wall_Stone_010_roughness.jpg');
const normalMap = textureLoader.load('./bricks/Wall_Stone_010_normal.jpg');
const heightMap = textureLoader.load('./bricks/Wall_Stone_010_height.png');

//Cube
const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 250, 250, 250);
const material = new THREE.MeshStandardMaterial(
    {
        map: map,
        aoMap: aoMap,
        roughnessMap: roughnessMap,
        normalMap: normalMap,
        displacementMap: heightMap,
        displacementScale: 0.05,
    }
);
const cube = new THREE.Mesh(geometry, material);
cube.scale.set(2.5, 2.5, 2.5);
scene.add(cube);

//Lights
/* const light = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(light); */

/* const pointLight = new THREE.PointLight(0xffffff, 1.1);
pointLight.position.y = 2;
scene.add(pointLight); */

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
/*  scene.add(directionalLight); */

const environmentMap = new THREE.CubeTextureLoader().load(['./envmap/px.png', './envmap/nx.png', './envmap/py.png', './envmap/ny.png', './envmap/pz.png', './envmap/nz.png']);
scene.environment = environmentMap;
scene.background = environmentMap;

//Render the scene
const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

animate();

//Mount Scene
export const mountScene = (mountRef) => {
    currentMount = mountRef.current;
    resize();
    currentMount.appendChild(renderer.domElement);
}

//Clean up Scene
export const cleanupScene = () => {
    currentMount.removeChild(renderer.domElement);
}