// Escena, cámara, y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Fondo transparente
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Luz ambiental suave
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Material
const materialA = new THREE.MeshStandardMaterial({ color: 0x0077ff, side: THREE.DoubleSide }); // Azul
const materialJ = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffff00, emissiveIntensity: 1, side: THREE.DoubleSide }); // Amarillo más intenso

// Cargar la fuente
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometryA = new THREE.TextGeometry('A', {
        font: font,
        size: 4, // Más grande
        height: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.06,
        bevelSize: 0.06,
        bevelSegments: 5
    });

    const textGeometryJ = new THREE.TextGeometry('J', {
        font: font,
        size: 4, // Más grande
        height: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.06,
        bevelSize: 0.06,
        bevelSegments: 5
    });

    const textMeshA = new THREE.Mesh(textGeometryA, materialA);
    textMeshA.position.x = -2.25; // Ajuste para letras más grandes
    scene.add(textMeshA);

    const textMeshJ = new THREE.Mesh(textGeometryJ, materialJ);
    textMeshJ.position.x = 2.25; // Ajuste para letras más grandes
    scene.add(textMeshJ);
});

camera.position.z = 10;
camera.position.y = 0;
let rotationAngle = 0;
const maxRotation = Math.PI / 6; // 30 degrees in radians
let rotatingForward = true;

function animate() {
    requestAnimationFrame(animate);

    const rotationStep = 0.001;

    if (rotatingForward) {
        scene.rotation.y += rotationStep;
        rotationAngle += rotationStep;
        if (rotationAngle >= maxRotation) {
            rotatingForward = false;
        }
    } else {
        scene.rotation.y -= rotationStep;
        rotationAngle -= rotationStep;
        if (rotationAngle <= -maxRotation) {
            rotatingForward = true;
        }
    }

    renderer.render(scene, camera);
}

animate();



const images = [
    "https://via.placeholder.com/600x400/FF5733",
    "https://via.placeholder.com/600x400/33FF57",
    "https://via.placeholder.com/600x400/3357FF"
];

let currentIndex = 0;
const imgElement = document.getElementById("gallery-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelector(".prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    imgElement.src = images[currentIndex];
});

document.querySelector(".next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    imgElement.src = images[currentIndex];
});

imgElement.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = imgElement.src;
});

lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
});








