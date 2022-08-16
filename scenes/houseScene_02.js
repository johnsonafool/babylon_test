// const canvas = document.getElementById("renderCanvas"); // Get the canvas element
// const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engin

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  /**** Set camera and light *****/
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    10,
    new BABYLON.Vector3(0, 0, 0)
  );
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0)
  );

  /**** Materials *****/
  //color
  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);

  //texture
  const roofMat = new BABYLON.StandardMaterial("roofMat");
  roofMat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/roof.jpg"
  );
  const boxMat = new BABYLON.StandardMaterial("boxMat");
  boxMat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/semihouse.png"
  );

  //options parameter to set different images on each side
  const faceUV = [];
  faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); //rear face
  faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); //front face
  faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
  faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side
  // top 4 and bottom 5 not seen so not set

  /**** World Objects *****/
  const box = BABYLON.MeshBuilder.CreateBox("box", {
    width: 2,
    faceUV: faceUV,
    wrap: true,
  });
  box.material = boxMat;
  box.position.y = 0.5;
  const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
    diameter: 1.3,
    height: 1.2,
    tessellation: 3,
  });
  roof.material = roofMat;
  roof.scaling.x = 0.75;
  roof.scaling.y = 2;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 10,
    height: 10,
  });
  ground.material = groundMat;

  return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});
