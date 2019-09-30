const canvas = document.getElementById('canvas')
const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer({
    canvas
    // alpha: true,
    // antialias: true
})
const camera = new THREE.PerspectiveCamera(
    10, // fov
    canvasWidth / canvasHeight, // aspect
    1, // near
    99999 // far
)
const distance = 1000
isoCamera = ThreeIsoGameCamera({
    domElement: canvas,
    canvasWidth,
    canvasHeight,
    THREE,
    d3,
    camera
    // angleH: 45,
    // angleV: 35,
    // distance,
    // distanceMin: distance,
    // distanceMax: distance * 3,
    // onStart,
    // onEnd,
    // onChange
})
renderer.setClearColor('#000000')
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(canvasWidth, canvasHeight)

function animate(time) {
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
animate()

window.addEventListener('resize', () => {
    const canvasWidth = window.innerWidth
    const canvasHeight = window.innerHeight
    // isoCamera.canvasWidth = canvasWidth
    // isoCamera.canvasHeight = canvasHeight
    isoCamera.updateCameraPosition()
    renderer.setSize(canvasWidth, canvasHeight)
    camera.aspect = canvasWidth / canvasHeight
    camera.updateProjectionMatrix()
})

/// VISUAL ELEMENTS
scene.add(new THREE.GridHelper(50, 100, 0xaaaaaa, 0x999999))
scene.add(new THREE.AxesHelper(5))
scene.add(
    new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            roughness: 0.4,
            metalness: 0.1
        })
    )
)

var dirLight = new THREE.DirectionalLight()
dirLight.position.set(1, 0.4, 0.2)
scene.add(dirLight, new THREE.AmbientLight(0x444444))