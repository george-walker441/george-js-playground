console.log("main.js has started");

// 1. Create scene
const scene = new THREE.Scene();

// 2. Create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 3. Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// second cube (red)
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
cube2.position.x = -2;
scene.add(cube2);

// third cube (blue)
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
cube3.position.x = 2;
scene.add(cube3);

for (let x = -5; x <= 5; x++) {
  for (let z = -5; z <= 5; z++) {
    const block = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.2, 1),
      new THREE.MeshStandardMaterial({ color: 0x8B4513 })
    );
    block.position.set(x, -1, z);
    scene.add(block);
  }
}

// 5. Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

// 6. Camera
camera.position.z = 3;

document.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    camera.position.x -= 0.1;
  }
  if (event.key === "d") {
    camera.position.x += 0.1;
  }
  if (event.key === "w") {
    camera.position.z -= 0.1;
  }
  if (event.key === "s") {
    camera.position.z += 0.1;
  }
});

// 7. Animate
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
  cube2.rotation.y += 0.01;
cube3.rotation.x += 0.01;
}

animate();