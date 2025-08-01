import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';



// Sahne, kamera ve küp
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;  // Küpü görebilmek için kamerayı biraz geri çekiyoruz


let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

const geometry = new THREE.BoxGeometry( 30, 30, 30 ); 
const material = new THREE.MeshBasicMaterial( {color: 0xff0000} ); 
const cube = new THREE.Mesh( geometry, material ); 
geometry.center();
scene.add(cube);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Işıklar

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(5, 5, 5);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);


// Ekran boyutu değişince
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Fare hareketiyle kutuyu döndür
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y = -3 + (mouseX / window.innerWidth) * 3;
  cube.rotation.x = -1.2 + (mouseY / window.innerHeight);
  renderer.render(scene, camera);
}

animate();
