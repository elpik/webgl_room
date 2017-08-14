var mesh, renderer, scene, camera, controls;

init();
animate();

function init() {

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x889988);
    document.body.appendChild(renderer.domElement);

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(10, 2, 5);
    scene.add(camera);

    // controls
    controls               = new THREE.OrbitControls(camera);
    controls.enableZoom    = true;
    controls.enablePan     = true;
    controls.maxPolarAngle = Math.PI / 2;

    // ambient
    scene.add(new THREE.AmbientLight(0x444444));

    // light
    var light = new THREE.PointLight(0xffffff, 0.8);
    light.position.set(10, 2, 5);
    camera.add(light);


    createCube();
    //
    createRoom();
    //createPlane([0, 0, 10], [0, 0, 0], 'textures/laminat.jpg');
    //createPlane([0, 5, 0], [1.5, 0, 0], 'textures/laminat2.png');
    //createPlane([0, 0, 0], [0, 0, 0], 'textures/laminat2.png');


}

function animate() {

    requestAnimationFrame(animate);

    //controls.update();

    renderer.render(scene, camera);

}


function createRoom() {

    var texture  = new THREE.TextureLoader().load('textures/laminat.jpg');
    var texture1 = new THREE.TextureLoader().load('textures/laminat2.png');
    var textureWall = new THREE.TextureLoader().load('textures/wall.jpg');
    var textureCeiling = new THREE.TextureLoader().load('textures/ceiling.jpg');

    var materials = [
        new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            map: textureWall
        }),
        new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            map: textureWall
        }),
        new THREE.MeshPhongMaterial({
            color: "#fff",
            side: THREE.BackSide,
            map: textureCeiling
        }),
        new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            map: texture1
        }),
        new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            map: textureWall
        }),
        new THREE.MeshPhongMaterial({
            side: THREE.BackSide,
            map: textureWall
        }),
    ];


    var geometry = new THREE.BoxGeometry(30, 10, 30);

    var material = new THREE.MeshPhongMaterial({
        color: "#fff",
        transparent: false,
        side: THREE.BackSide,
        map: texture

    });
    //mesh         = new THREE.Mesh(geometry,  material);
    mesh         = new THREE.Mesh(geometry, materials);
    scene.add(mesh);
}

function createCube() {
    var texture = new THREE.TextureLoader().load('textures/laminat.jpg');

    var geometry = new THREE.BoxGeometry(2, 2, 2);

    // material
    var material1 = new THREE.MeshPhongMaterial({
        color: '#fff',
        map: texture
    });

    // mesh
    mesh = new THREE.Mesh(geometry, material1);
    mesh.position.set(-2, -4, -6);
    scene.add(mesh);
}

function createPlane(position, rotation, texture) {
    var texture = new THREE.TextureLoader().load(texture);

    var geometry = new THREE.PlaneGeometry(20, 10, 20);
    var material = new THREE.MeshBasicMaterial(
        {
            map: texture,
            side: THREE.DoubleSide
        }
    );
    mesh         = new THREE.Mesh(geometry, material);

    mesh.position.set(position[0], position[1], position[2]);

    mesh.rotation.x = rotation[0];
    mesh.rotation.y = rotation[1];
    mesh.rotation.z = rotation[2];

    scene.add(mesh);
}