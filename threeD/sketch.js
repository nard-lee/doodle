// Create a scene
let scene = new THREE.Scene();

// Create a camera
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 800);
camera.position.z = 5;

// Create a renderer
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a geometry
let geometry = new THREE.BoxGeometry(1, 1, 1);

// Create a material
let material = new THREE.MeshBasicMaterial({color: 'red'});

// Create a cube
let cube = new THREE.Mesh(geometry, material);

// Add the cube to the scene
scene.add(cube);

// Create the animation
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation
animate();
