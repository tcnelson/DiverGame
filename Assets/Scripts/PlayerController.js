#pragma strict

var speed : float;            					// The speed that the player will move at.

var startingHealth : float = 100;				// start health/oxygen
var currentHealth : float;						// current health/oxygen
var healthSlider : UnityEngine.UI.Slider;       // Reference to the UI's health bar.

private var movement : Vector2;    				// The vector to store the direction of the player's movement.
private var playerRigidbody : Rigidbody2D;      // Reference to the player's rigidbody.

private var isDead : boolean;                   // Whether the player is dead.
private var damaged : boolean;                  // True when the player gets damaged.

function Awake() {
	currentHealth = startingHealth;
}

function Start () {
	playerRigidbody = GetComponent (Rigidbody2D);
}

function Update () {

}

function FixedUpdate ()
{
    // Store the input axes.
    var h : float = Input.GetAxisRaw ("Horizontal");
    var v : float = Input.GetAxisRaw ("Vertical");

    // Move the player around the scene.
    Move (h, v);
    
    // Decrease o2 over time
    currentHealth -= ( 1 * Time.deltaTime );
    healthSlider.value = currentHealth;
}

function Move (h : float, v : float)
{
    // Set the movement vector based on the axis input.
    movement.Set(h, v);
    
    // Normalise the movement vector and make it proportional to the speed per second.
    movement = movement.normalized * speed * Time.deltaTime;

    // Move the player to it's current position plus the movement. 	
    playerRigidbody.MovePosition (transform.position + movement);
}

public function TakeDamage (amount : float)
{
    // Set the damaged flag so the screen will flash.
    damaged = true;

    // Reduce the current health by the damage amount.
    currentHealth -= amount;

    // Set the health bar's value to the current health.
    healthSlider.value = currentHealth;

    // Play the hurt sound effect.
    //playerAudio.Play ();

    // If the player has lost all it's health and the death flag hasn't been set yet...
    if(currentHealth <= 0 && !isDead)
    {
        // ... it should die.
        Death ();
    }
}

function Death ()
{
    // Set the death flag so this function won't be called again.
    isDead = true;
}