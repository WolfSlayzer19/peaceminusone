import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const torusTexture = new THREE.TextureLoader().load('torus.jpeg');
const geometry = new THREE.TorusGeometry(10.5, 2.5, 9, 100);
const material = new THREE.MeshStandardMaterial({ map: torusTexture });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const starTexture = new THREE.TextureLoader().load('WhatsApp Image 2022-01-06 at 9.11.55 AM (2).jpeg');
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ starTexture });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('WhatsApp Image 2022-01-07 at 2.14.35 PM.jpeg');
scene.background = spaceTexture;

// Avatar

const pmoTexture = new THREE.TextureLoader().load('pmologo.jpg');

const pmo = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: pmoTexture }));

scene.add(pmo);

// ball

const moonTexture = new THREE.TextureLoader().load('OIP.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1, 1),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
    })
);

// sphere
newFunction();

function newFunction() {
    const sphereTexture = new THREE.TextureLoader().load('pppp.jpg');

    const sphere = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 1), new THREE.MeshBasicMaterial({ map: sphereTexture }));
    scene.add(sphere);
    sphere.position.z = 0;
    sphere.position.x = 3;


};

scene.add(moon);

moon.position.z = 28;
moon.position.setX(-1.7);


pmo.position.z = -4.8;
pmo.position.x = 2;




// Scroll Animation

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.03;
    moon.rotation.y += 0.03;
    moon.rotation.z += 0.03;

    pmo.rotation.y += 0.02;
    pmo.rotation.z += 0.02;



    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0003;
    camera.rotation.y = t * -0.0003;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    moon.rotation.x += 0.005;

    // controls.update();

    renderer.render(scene, camera);
}

animate();