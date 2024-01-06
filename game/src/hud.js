var score = 0;
var scoreText;

var createHud = function () {
	var hudTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

	scoreText = new BABYLON.GUI.TextBlock();
scoreText.fontFamily = "Arial, Helvetica, sans-serif"; // More professional font
scoreText.color = "white";
scoreText.fontSize = "4%"; // Responsive font size
scoreText.paddingTop = "1%"; // Padding for better positioning
scoreText.shadowColor = "black"; // Shadow for better visibility
scoreText.shadowOffsetX = 2;
scoreText.shadowOffsetY = 2;
scoreText.verticalAlignment = BABYLON.GUI.TextBlock.VERTICAL_ALIGNMENT_TOP;
scoreText.horizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
scoreText.width = 0.5;
scoreText.height = 0.15;


	updateScoreText();

	hudTexture.addControl(scoreText);
};

var updateScoreText = function () {
	scoreText.text = "Score: " + score;
};

var resetScore = function () {
	console.log("Score reset at: " + score);
	score = 0;
	updateScoreText();
};

var addScore = function (points) {
	score += points;
	updateScoreText();
};
