import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



// Texture
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = (e)=>{
    console.log('loading started')
    
}
loadingManager.onProgress = ()=>{
    console.log('loading in progress')
}
loadingManager.onLoad = ()=>{
    console.log('loaded')
}
loadingManager.onError = ()=>{
    console.log('error loading')
}
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png')
colorTexture.colorSpace = THREE.SRGBColorSpace
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
alphaTexture.colorSpace = THREE.SRGBColorSpace
const ambientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
ambientTexture.colorSpace = THREE.SRGBColorSpace
const heightTexture = textureLoader.load('/textures/door/height.jpg')
heightTexture.colorSpace = THREE.SRGBColorSpace
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
metalnessTexture.colorSpace = THREE.SRGBColorSpace
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
normalTexture.colorSpace = THREE.SRGBColorSpace
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
roughnessTexture.colorSpace = THREE.SRGBColorSpace

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3

// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = .5
// colorTexture.offset.y = .5

// colorTexture.rotation = Math.PI / 4

// colorTexture.center.x = .5
// colorTexture.center.y = .5


// colorTexture.minFilter = THREE.NearestFilter
// colorTexture.generateMipmaps = false
// colorTexture.magFilter = THREE.NearestFilter


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
const material = new THREE.MeshBasicMaterial({ 
    // color: 0x00fffff,
     map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()