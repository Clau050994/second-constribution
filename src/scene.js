const gameHeight = 5; // Defines the height of the floor and ceiling in the game.

var camera;

var createScene = function () {
	// This creates a basic Babylon Scene object (non-mesh)
	var scene = new BABYLON.Scene(engine);

	// This creates and positions a free camera (non-mesh)
	camera = new BABYLON.TargetCamera("camera1", new BABYLON.Vector3(0, 0, -15), scene);

	// This targets the camera to scene origin (where the player is)
	camera.setTarget(BABYLON.Vector3.Zero());

	// This attaches the camera to the canvas
	camera.attachControl(canvas, true);

	// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
	var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0.3, 0.7, -0.3), scene);

	// Default intensity is 1. Let's dim the light a small amount
	light.intensity = 0.7;

	// Add a ground and ceiling object
	// Load textures for ground and ceiling
var groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
groundMaterial.diffuseTexture = new BABYLON.Texture("textures/ground.jpg", scene); // Replace with your ground texture

var ceilingMaterial = new BABYLON.StandardMaterial("ceilingMat", scene);
ceilingMaterial.diffuseTexture = new BABYLON.Texture("textures/sky.jpg", scene); // Replace with your ceiling texture

// Add a ground and ceiling object with textures
var ground = BABYLON.MeshBuilder.CreateBox("ground", { width: 100, depth: 6, height: 1 }, scene);
var ceiling = BABYLON.MeshBuilder.CreateBox("ceiling", { width: 100, depth: 6, height: 1 }, scene);
ground.position.y = -gameHeight - 0.5;
ceiling.position.y = gameHeight + 0.5;

// Apply materials to ground and ceiling
ground.material = groundMaterial;
ceiling.material = ceilingMaterial;

// Optional: Add lighting to enhance appearance
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 0.7;


	createHud();

	return scene;
};

var updateGame = function () {
	updateGameState();
};
