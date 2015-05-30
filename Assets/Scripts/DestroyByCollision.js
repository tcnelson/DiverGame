#pragma strict

var damage : float = 20f;

function OnCollisionEnter2D(hit : Collision2D){
	//Destroy(gameObject);
}

function OnTriggerEnter2D(hit : Collider2D){
	if (hit.transform.tag == "Player" ) {				// Early return if shot hits player
		return; 
	}
	else if (hit.transform.tag == "Boundary") {			// Early return to ignore collisions w/ Boundary
		return;
	}
	else if (hit.transform.tag == "EnemySight") {		// Early return to ignore enemy sense collliders
		return;
	}
	else if (hit.transform.tag == "Enemy") {
		var enemyController = hit.GetComponent(EnemyController);
		enemyController.Damage(damage);
		Destroy(gameObject);							// Destroy shot on collision with enemy
	}
	else if (hit.transform.tag == "Environment") {
		Destroy(gameObject);							// Destroy shot on collision with other game object
	}
}