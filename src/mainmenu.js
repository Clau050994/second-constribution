var gamepadManager = new BABYLON.GamepadManager();

var deviceSourceManager;

class MainMenu extends GameObject {
	constructor() {
		super();
	}

	init() {
		this.visible = true;
		this._isVisible = false;
		this.createMainMenu();
		this.setupInputs();
	}

	onDestroy() {}

	update(deltaTime) {
		// Don't do anything here
		if (this._isVisible !== this.visible) {
			this._isVisible = this.visible;
			if (this._isVisible) {
				this.showUI();
			} else {
				this.hideUI();
			}
		}
	}

	onStartGame() {
		if (this.visible) {
			this.visible = false;
			createObject(new Player());
		}
	}

	setupInputs() {
		deviceSourceManager = new BABYLON.DeviceSourceManager(scene.getEngine());
		/**
		 * onDeviceConnectedObservable is fired after a device is connected so any code that we
		 * put in here should be able to reliably work against an existing device.
		 *
		 * For onInputChangedObservable, this will only work with Mouse, Touch, and Keyboards because
		 * the Gamepad API currently does not fire input changed events (polling only)
		 */
		deviceSourceManager.onDeviceConnectedObservable.add((deviceSource) => {
			// If Mouse/Touch, add an Observer to change text
			if (
				deviceSource.deviceType === BABYLON.DeviceType.Mouse ||
				deviceSource.deviceType === BABYLON.DeviceType.Touch
			) {
				deviceSource.onInputChangedObservable.add((eventData) => {
					if (eventData.type === "pointerdown" && eventData.inputIndex === BABYLON.PointerInput.LeftClick) {
						this.onStartGame();
					}
				});
			}
			// If Keyboard, add an Observer to change text
			else if (deviceSource.deviceType === BABYLON.DeviceType.Keyboard) {
				deviceSource.onInputChangedObservable.add((eventData) => {
					if (eventData.type === "keydown" && eventData.key === " ") {
						this.onStartGame();
					}
				});
			}
		});

		// This callback is invoked when a new controller is attached:
		gamepadManager.onGamepadConnectedObservable.add((gamepad, state) => {
			// When a new controller is connected add support for detecting button presses
			gamepad.onButtonDownObservable.add((button, state) => {
				this.onStartGame();
			});
		});
	}

	createMainMenu() {
		this.hudTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("Menu");
	}

	getGreeting() {
		// Pick a random greeting from the list in constants.js
		let val = Math.floor(Math.random() * greetings.length);
		return greetings[val];
	}

	showUI() {
		let greeting = this.getGreeting();
	
		// Common font style
		const commonFontFamily = "Impact";
	
		// Welcome Text - Make it bright and engaging
		this.welcomeText = new BABYLON.GUI.TextBlock();
		this.welcomeText.text = "Flying Cube Game!";
		this.welcomeText.fontFamily = commonFontFamily;
		this.welcomeText.color = "#00FF00"; // Bright Green
		this.welcomeText.fontSize = "6%";
		this.welcomeText.shadowColor = "black";
		this.welcomeText.shadowOffsetX = 2;
		this.welcomeText.shadowOffsetY = 2;
		this.welcomeText.verticalAlignment = BABYLON.GUI.TextBlock.VERTICAL_ALIGNMENT_TOP;
		this.welcomeText.horizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
		this.welcomeText.top = "2%";
	
		// Greeting Text - Use a color that stands out
		this.greetingText = new BABYLON.GUI.TextBlock();
		this.greetingText.text = greeting;
		this.greetingText.fontFamily = commonFontFamily;
		this.greetingText.color = "#FFD700"; // Gold
		this.greetingText.fontSize = "3%";
		this.greetingText.shadowColor = "black";
		this.greetingText.shadowOffsetX = 1;
		this.greetingText.shadowOffsetY = 1;
		this.greetingText.verticalAlignment = BABYLON.GUI.TextBlock.VERTICAL_ALIGNMENT_TOP;
		this.greetingText.horizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
		this.greetingText.top = "10%";
	
		// Instructions Text - Bright and clear
		this.instructionsText = new BABYLON.GUI.TextBlock();
		this.instructionsText.text = "Press any key to play";
		this.instructionsText.fontFamily = commonFontFamily;
		this.instructionsText.color = "#FF4500"; // Bright Orange
		this.instructionsText.fontSize = "4%";
		this.instructionsText.shadowColor = "black";
		this.instructionsText.shadowOffsetX = 1;
		this.instructionsText.shadowOffsetY = 1;
		this.instructionsText.verticalAlignment = BABYLON.GUI.TextBlock.VERTICAL_ALIGNMENT_TOP;
		this.instructionsText.horizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
		this.instructionsText.top = "18%";
	
		// Adding controls to HUD texture
		this.hudTexture.addControl(this.welcomeText);
		this.hudTexture.addControl(this.greetingText);
		this.hudTexture.addControl(this.instructionsText);
	}
	

	hideUI() {
		this.hudTexture.removeControl(this.welcomeText);
		this.hudTexture.removeControl(this.greetingText);
		this.hudTexture.removeControl(this.instructionsText);
	}
}

var mainMenu = new MainMenu();
createObject(mainMenu);
mainMenu.visible = true;
