#pragma strict

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
	else if (hit.transform.tag == "Enemy") {
		Destroy(gameObject);							// Destroy shot on collision with enemy
		Destroy(hit.gameObject);						// Destroy enemy on collision with shot
	}
	
	Destroy(gameObject);								// Destroy shot on collision with other game object
}