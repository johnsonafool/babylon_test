const canvas = document.getElementById("renderCanvas"); // Get the canvas element

const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
new BABYLON.Color3.Red();
new BABYLON.Color3.Green();
new BABYLON.Color3.Blue();
new BABYLON.Color3.Black();
new BABYLON.Color3.White();
new BABYLON.Color3.Purple();
new BABYLON.Color3.Magenta();
new BABYLON.Color3.Yellow();
new BABYLON.Color3.Gray(), new BABYLON.Color3.Teal();

// Add your code here matching the playground format
const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  // faceUV = [];
  // faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
  // faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
  // faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
  // faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side

  // const box = BABYLON.MeshBuilder.CreateBox("box", {});
  //   const box = BABYLON.MeshBuilder.CreateBox("box", {
  // width: 2,
  // height: 1.5,
  // depth: 3,
  //   }); // unit cube

  // console.log(faceUV);

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    15,
    new BABYLON.Vector3(0, 0, 0)
  );

  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0)
  );

  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "https://assets.babylonjs.com/meshes/",
    "both_houses_scene.babylon"
  ).then((result) => {
    const house1 = scene.getMeshByName("detached_house");
    house1.position.y = 0;
    const house2 = result.meshes[2];
    house2.position.y = 0;
  });

  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 10,
    height: 10,
  });

  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
  ground.material = groundMat; //Place the material property of the ground

  // const box = BABYLON.MeshBuilder.CreateBox("box", {
  // faceUV: faceUV,
  // wrap: true,
  // });

  // box.scaling.x = 2;
  // box.scaling.y = 1.5;
  // box.scaling.z = 3;

  // box.scaling = new BABYLON.Vector3(2, 1.5, 3);

  // box.position.y = 0.5;
  // box.position = new BABYLON.Vector3(-2, 0.75, 0.1);

  // box.rotation.y = Math.PI / 4;
  // box.rotation.y = BABYLON.Tools.ToRadians(45);  // rotation stuff

  // const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
  //   diameter: 1.3,
  //   height: 1.2,
  //   tessellation: 3,
  // });

  // roof.scaling.x = 0.75;
  // roof.rotation.z = Math.PI / 2;
  // roof.position.y = 1.22;

  // const roofMat = new BABYLON.StandardMaterial("roofMat");
  // roofMat.diffuseTexture = new BABYLON.Texture(
  //   "https://assets.babylonjs.com/environments/roof.jpg",
  //   scene
  // );

  // const boxMat = new BABYLON.StandardMaterial("boxMat");
  // boxMat.diffuseTexture = new BABYLON.Texture(
  //   "https://www.babylonjs-playground.com/textures/floor.png"
  // );

  // roof.material = roofMat;
  // box.material = boxMat;

  const sound = new BABYLON.Sound("name", "url to sound file", scene, null, {
    loop: true,
    autoplay: true,
  });

  sound.play();

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
