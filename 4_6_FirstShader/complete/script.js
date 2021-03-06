const vshader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4 (position, 1.0);
  }

`

const fshader = `
uniform vec3 u_color;

  void main () {
    gl_FragColor = vec4(u_color, 1.0).grba;
  }
`

const scene = new THREE.Scene();

// OrthographicCamera(left, right, top, bottom, near, far)
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const uniforms = { u_color: { value: new THREE.Color(0xF20732) } };

const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vshader,
  fragmentShader: fshader
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 1;
renderer.render(scene, camera);

// console.log(scene);

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
}

window.addEventListener('resize', onWindowResize, false);


