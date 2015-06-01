#pragma strict

var startingHealth : float = 100;				// start health/oxygen
var currentHealth : float;						// current health/oxygen

var isDead : boolean = false;

function Awake() {
	currentHealth = startingHealth;
}

function Heal (amount : float) {
	currentHealth += amount;
	if (currentHealth > startingHealth) 
		currentHealth = startingHealth;
}

function Damage (amount : float) {
	currentHealth -= amount;
	if (currentHealth < 0) {
		currentHealth = 0;
		isDead = true;
	}
		
}