#pragma strict

private var text : UnityEngine.UI.Text;
private var playerHealth : PlayerHealth;

function Awake() {
	text = GetComponent(UnityEngine.UI.Text);
	playerHealth = GameObject.FindGameObjectWithTag("GameController").GetComponent(PlayerHealth);
}

function Start() {
	text.enabled = false;
}

function Update () {
	if (!playerHealth.isDead) {
		return;
	}
	
	text.enabled = true;

	if (Input.GetButton("Submit")) {
		Application.LoadLevel(0);
	}
	else if (Input.GetButton("Cancel")) {
		Application.Quit();
	}
	
}