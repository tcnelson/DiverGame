#pragma strict

var startingHealth : float = 100;				// start health/oxygen
var currentHealth : float;						// current health/oxygen

function Awake() {
	currentHealth = startingHealth;
}

function Start () {

}

function Update () {

}

function FixedUpdate () {

	// Decrease hp over time
    currentHealth -= ( 1 * Time.deltaTime );
}