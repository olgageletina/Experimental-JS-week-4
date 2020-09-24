var vShader = `
    varying vec3 v_position; 
    varying vec2 v_UV;

    void main() {
        v_position = position;
        gl_Position = projectionMatrix* modelViewMatrix *vec4(position, 1.0);
    }
`
var fShader = `
    uniform float u_time;
    varying vec3 v_position;

    void main() {
        float sinP = sin(u_time * 1.25 + v_position.x * v_position.y);
        vec3 color = vec3(0.5, sinP, 0.5);

        gl_FragColor= vec4(color, 1.0);
    }
`

var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
var renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

var uniforms = {
    u_time: { value: 0.0 }
}

var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vShader,
    fragmentShader: fShader
})

var clock = new THREE.Clock;
var geometry = new THREE.PlaneGeometry(2, 2);
var plane = new THREE.Mesh(geometry, material);

scene.add(plane);

camera.position.z = 1;


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    uniforms.u_time.value = clock.getElapsedTime();
}

function onWindowResize() {
    var aspectRatio = window.innerWidth / window.innerHeight;
    var width, height;

    if (aspectRatio >= 1) {
        width = 1;
        height = window.innerHeight / window.innerWidth;
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

animate();






