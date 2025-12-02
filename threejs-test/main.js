
console.log("main.js has started");

// 1. Scene
const scene = new THREE.Scene();

// 2. Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 10);

// 3. Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Lights
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(3, 5, 2);
scene.add(dirLight);

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

// 5. Three coloured cubes
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
cube1.position.set(0, 0, 0);
scene.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
cube2.position.set(-2, 0, 0);
scene.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
cube3.position.set(2, 0, 0);
scene.add(cube3);

// 6. Voxel floor
for (let x = -5; x <= 5; x++) {
  for (let z = -5; z <= 5; z++) {
    const block = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.2, 1),
      new THREE.MeshStandardMaterial({ color: 0x8b4513 })
    );
    block.position.set(x, -1, z);
    scene.add(block);
  }
}

// 7. Player cube
const player = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
player.position.set(0, 0, 3);
scene.add(player);

// 8. Input state (WASD + spacebar)
const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  " ": false, // spacebar
};

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (keys.hasOwnProperty(key)) {
    keys[key] = true;
  }
});

document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (keys.hasOwnProperty(key)) {
    keys[key] = false;
  }
});

// 9. Movement + jumping
const moveSpeed = 0.1;
let yVelocity = 0;
let isGrounded = true;
const gravity = -0.01;
const jumpPower = 0.2;

// 10. Camera follow setup
const cameraOffset = new THREE.Vector3(0, 5, 10);

function updatePlayer() {
  // horizontal movement
  if (keys.w) player.position.z -= moveSpeed;
  if (keys.s) player.position.z += moveSpeed;
  if (keys.a) player.position.x -= moveSpeed;
  if (keys.d) player.position.x += moveSpeed;

  // jumping
  if (keys[" "] && isGrounded) {
    yVelocity = jumpPower;
    isGrounded = false;
  }

  // gravity
  yVelocity += gravity;
  player.position.y += yVelocity;

  // ground collision
  if (player.position.y <= 0) {
    player.position.y = 0;
    yVelocity = 0;
    isGrounded = true;
  }
}

function updateCamera() {
  const desiredPos = player.position.clone().add(cameraOffset);
  camera.position.lerp(desiredPos, 0.1);
  camera.lookAt(player.position);
}

// 11. Pickups + score
const pickups = [];
let score = 0;
const scoreElement = document.getElementById("score");

// create some pickups
for (let i = 0; i < 10; i++) {
  const pickup = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshStandardMaterial({ color: 0xffd700 }) // gold
  );

  pickup.position.set(
    (Math.random() - 0.5) * 10,
    0.25,
    (Math.random() - 0.5) * 10
  );

  pickups.push(pickup);
  scene.add(pickup);
}

function updatePickups() {
  for (let i = pickups.length - 1; i >= 0; i--) {
    const p = pickups[i];

    // spin
    p.rotation.y += 0.02;

    // check distance to player
    const dist = p.position.distanceTo(player.position);
    if (dist < 0.7) {
      // collect
      scene.remove(p);
      pickups.splice(i, 1);
      score++;
      if (scoreElement) {
        scoreElement.textContent = "Score: " + score;
      }
    }
  }
}

// 12. Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 13. Animation loop
function animate() {
  requestAnimationFrame(animate);

  // spin cubes a bit
  cube1.rotation.y += 0.01;
  cube2.rotation.x += 0.01;
  cube3.rotation.y -= 0.01;

  updatePlayer();
  updateCamera();
  updatePickups();

  renderer.render(scene, camera);
}

animate();