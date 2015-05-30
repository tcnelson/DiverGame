#pragma strict

var minFactor : float = 0.25f;

private var playerHealth : PlayerHealth;
private var startingScale : Vector3;


function Awake() {
	playerHealth = GameObject.FindGameObjectWithTag("GameController").GetComponent(PlayerHealth);
	startingScale = transform.localScale;
}

function Update() {
	var factor = (playerHealth.currentHealth / playerHealth.startingHealth);
	if (factor < minFactor) { factor = minFactor; }
	
	transform.localScale = startingScale * factor;
}