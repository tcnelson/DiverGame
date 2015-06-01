#pragma strict

var deleteDelay: float;								// Pause before deleting the treasure chest game object (after it's been opened)
var idleSprite : Sprite;
var openSprite : Sprite;

private var spriteRenderer : SpriteRenderer;

function Awake () {
	spriteRenderer = GetComponent(SpriteRenderer);	// The sprite renderer for the treasure chest
}

function OnTriggerEnter2D(hit : Collider2D){
	var audio : AudioSource = GetComponent (AudioSource);
	
	if (hit.transform.tag == "Player" ) {			// Change sprite to open version on contact with player's collider
		audio.Play();
		spriteRenderer.sprite = openSprite;
		Destroy(gameObject, deleteDelay);			// Destroy treasure chest game object after a delay
	}
}