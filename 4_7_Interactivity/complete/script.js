const vShader = `
  void main() {	
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`

const fShader = `
  uniform vec2 u_mouse;

  void main () {
    vec3 color = vec3(gl_FragCoord.x/ u_mouse.x, 0.5, gl_FragCoord.y/u_mouse.y);
    gl_FragColor = vec4(color, 1.0);
  }
`

const scene = new THREE.Scene();

// OrthographicCamera(left, right, top, bottom, near, far)
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(2, 2);

const uniforms = {
  u_mouse: { value: { x: window.innerWidth / 2.0, y: window.innerHeight / 2.0 } },
  u_resolution: { value: { x: window.innerWidth, y: window.innerHeight } }
};


const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vShader,
  fragmentShader: fShader
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 1;
renderer.render(scene, camera);


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function onMouseMove(e) {
  uniforms.u_mouse.value.x = e.clientX;
  uniforms.u_mouse.value.y = e.clientY;
};

function onWindowResize() {
  const aspectRatio = window.innerWidth / window.innerHeight;
  let width, height;
  if (aspectRatio >= 1) {
    width = 1;
    height = (window.innerHeight / window.innerWidth) * width;
  } else {
    width = aspectRatio;
    height = 1;
  }
  camera.left = -width;
  camera.right = width;
  camera.top = height;
  camera.bottom = -height;

  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = window.innerWidth;
  uniforms.u_resolution.value.y = window.innerHeight;
}

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('mousemove', onMouseMove, false);

animate();


