//***Saturn ThreeJS Exam***//
//Leonar
//localhost:8000

//***Important***//
const SCENE = new THREE.Scene();
const FOV = 55;
const NEAR  = 0.1;
const FAR = 1000;
const MAXPARTICLES = 1000;
const RENDERER = new THREE.WebGLRenderer();
RENDERER.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(RENDERER.domElement);

//**Camera***//
let camera = new THREE.PerspectiveCamera(
    FOV,
    window.innerWidth / window.innerHeight,
    NEAR,
    FAR
);

camera.position.x = 0;
camera.position.y = 60; //close to birds eyeview angle
camera.position.z = 150;
camera.lookAt (new THREE.Vector3(0, 0 ,0));

//***Saturn Rings***//
let asteroids = new THREE.TextureLoader().load('img/lookatthisparticles.jpg');
let particlesGeometry = new THREE.Geometry();
for (let i = 0; i < MAXPARTICLES; i++) {
    let particle = new THREE.Vector3(
        random(-180, 180),
        random(-4.5, 4.5),
        random(-80, 180)
    );
    particlesGeometry.vertices.push(particle);
}
let particleMaterial = new THREE.ParticleBasicMaterial({
    color: "0xG7BFB3",
    size: 3.5,
});
particleMaterial.map = THREE.ImageUtils.loadTexture('img/lookattherocks.jpg');
let particleMesh = new THREE.ParticleSystem(particlesGeometry, particleMaterial);
particleMesh.sortParticles = true;
SCENE.add(particleMesh);

//***SATURN PLANET***//
let saturnLoader = new THREE.TextureLoader().load('img/howtosaturn.jpg');
let saturnGeometry = new THREE.SphereGeometry( 50, 32, 32);
let saturnMaterial = new THREE.MeshBasicMaterial ({map: saturnLoader});
let saturnMesh = new THREE.Mesh( saturnGeometry, saturnMaterial);
SCENE.add (saturnMesh);

//***Galaxy Background***//
let galaxyGeometry = new THREE.SphereGeometry( 250, 32, 32);
let galaxyMaterial = new THREE.MeshBasicMaterial();
galaxyMaterial.map = THREE.ImageUtils.loadTexture('img/galaxy.jpg');
galaxyMaterial.side = THREE.BackSide;
let galaxyMesh = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
SCENE.add(galaxyMesh);
galaxyMesh.position.z = 100

//***SOURCE OF LIGHT***//
let light = new THREE.AmbientLight("#FFFFFF");
SCENE.add(light);

//***Random No. Generator***//
function random(min, max) {
    if (isNaN(max)) {
        max = min;
        min = 0;
    }
    return Math.random() * (max - min) + min;
}

//***Render Loop***//
function render() {
    requestAnimationFrame(render);
    particleMesh.rotation.y += -0.00500; //Rotation of the Saturns rings
    saturnMesh.rotation.y += -0.00100; //Rotation of Saturn
    galaxyMesh.rotation.y += -0.0010; //Rotation of the background galaxy
    RENDERER.render(SCENE, camera);
}
render();

//**Resize***//
function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    RENDERER.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize, false);