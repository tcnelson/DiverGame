#pragma strict

var destroyDelay : float;
var oxygenHealth : float;

private var playerHealth : PlayerHealth;
private var oxygenSound : AudioSource;

function Awake() {
	playerHealth = GameObject.FindGameObjectWithTag("GameController").GetComponent(PlayerHealth);

	oxygenHealth = Random.Range(10, 20);
	
	oxygenSound = GetComponent(AudioSource);

}

function OnTriggerEnter2D (hit : Collider2D) {
	if (hit.transform.tag == "Player") {
		playerHealth.Heal(oxygenHealth);
		oxygenSound.Play();
		Destroy(gameObject, destroyDelay);
	}	
}