const three = require('three')
const $ = require('jquery')

module.exports = function (app) {
  var mouse
  var raycaster
  let floor
  let helperGeometry
  let helper

  return {
    init () {
      app.scene = new three.Scene()
      app.camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      app.renderer = new three.WebGLRenderer()
      mouse = new three.Vector2()
      raycaster = new three.Raycaster()
      helperGeometry = new three.SphereGeometry(0.5)
      helper = new three.Mesh(helperGeometry, new three.MeshNormalMaterial())

      document.addEventListener('mousemove', this.onMouseMove, false)
      app.renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(app.renderer.domElement)

      $('canvas').click(() => {
        var intersects = raycaster.intersectObject(floor)
        // Toggle rotation bool for meshes that we clicked
        if (intersects.length > 0) {
          console.log(intersects[ 0 ].point)
        }
      })

      var floorGeometry = new three.BoxGeometry(100, 100, 1)
      var floorMaterial = new three.MeshBasicMaterial({ color: 0xc0c0c0 })
      floor = new three.Mesh(floorGeometry, floorMaterial)
      floor.translateX(50)
      floor.translateY(50)

      app.scene.add(helper)
      app.scene.add(floor)
      app.camera.position.z = 100
      app.camera.position.x = 50
      app.camera.position.y = 50

      function animate () {
        window.requestAnimationFrame(animate)
        // app.onlineUsers.forEach()
        app.renderer.render(app.scene, app.camera)
      }
      animate()
    },

    addUser (user) {
      var userGeometry = new three.SphereGeometry(0.5)
      var userMaterial = new three.MeshBasicMaterial({ color: 0xff0000 })
      var userMesh = new three.Mesh(userGeometry, userMaterial)
      userMesh.translateX(user.coords.x)
      userMesh.translateY(user.coords.y)
      userMesh.translateZ(2)

      user.mesh = userMesh
      app.scene.add(userMesh)
    },

    onMouseMove (event) {
      mouse.x = (event.clientX / app.renderer.domElement.clientWidth) * 2 - 1
      mouse.y = -(event.clientY / app.renderer.domElement.clientHeight) * 2 + 1
      raycaster.setFromCamera(mouse, app.camera)
      // See if the ray from the camera into the world hits one of our meshes
      var intersects = raycaster.intersectObject(floor)
      // Toggle rotation bool for meshes that we clicked
      if (intersects.length > 0) {
        helper.position.set(0, 0, 0)
        helper.position.copy(intersects[ 0 ].point)
      }
    }
  }
}
