#pragma strict

private var healthSlider : UnityEngine.UI.Slider;       // Reference to the UI's health bar.
private var playerHealth : PlayerHealth;

function Awake () {
	healthSlider = GetComponent(UnityEngine.UI.Slider);
	playerHealth = GameObject.FindGameObjectWithTag("GameController").GetComponent(PlayerHealth);
}

function Update () {
    healthSlider.value = playerHealth.currentHealth;
}