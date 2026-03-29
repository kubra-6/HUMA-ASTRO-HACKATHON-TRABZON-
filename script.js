// --- 1. YILDIZLARI OLUŞTURMA ---
function createStars() {
    const starsContainer = document.getElementById('stars');
    starsContainer.innerHTML = '';
    const starCount = 300;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 2 + 1;
        
        star.style.position = 'absolute';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.opacity = Math.random();
        
        starsContainer.appendChild(star);
    }
}
createStars();

// --- 2. THREE.JS İLE 3D AY MODELİ ---
const container = document.getElementById('canvas-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4.5; 

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// AYIN BOYUTU BURADAN KÜÇÜLTÜLDÜ (1.5'ten 1.0'a çekildi)
const geometry = new THREE.SphereGeometry(1.0, 64, 64);

const textureLoader = new THREE.TextureLoader();
const moonTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg');

const material = new THREE.MeshStandardMaterial({
    map: moonTexture,
    roughness: 0.8,
});

const moon = new THREE.Mesh(geometry, material);
scene.add(moon);

// --- 3. IŞIKLANDIRMALAR ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
mainLight.position.set(5, 3, 5); 
scene.add(mainLight);

const blueLight = new THREE.DirectionalLight(0x0055ff, 0.6);
blueLight.position.set(-5, 0, 2); 
scene.add(blueLight);

const redLight = new THREE.DirectionalLight(0xff0000, 0.6);
redLight.position.set(5, 0, 2); 
scene.add(redLight);

// --- 4. ANİMASYON VE DÖNDÜRME ---
function animate() {
    requestAnimationFrame(animate);
    moon.rotation.y += 0.0015;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    createStars();
});