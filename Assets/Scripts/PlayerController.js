#pragma strict

var speed : float;            					// The speed that the player will move at.

var startingHealth : float = 100;				// start health/oxygen
var currentHealth : float;						// current health/oxygen
var healthSlider : UnityEngine.UI.Slider;       // Reference to the UI's health bar.

var shot : GameObject;							// Reference to the shot game object that the player fires
var fireRate : float;							// The rate at which the player can generate new shots (cooldown period)
var shotSpeed : float;							// The speed at which the shot clone will move

private var nextFire : float;					// When the next shot can be fired
private var shotSpawn : Transform;						// Where the shot spawns

private var movement : Vector2;    				// The vector to store the direction of the player's movement.
private var playerRigidbody : Rigidbody2D;      // Reference to the player's rigidbody.

private var isDead : boolean;                   // Whether the player is dead.
private var damaged : boolean;                  // True when the player gets damaged.

private var directionFacing : Vector2;			// The direction the player is facing

private var animator : Animator;				// The animator attached to the player

function Awake() {
	currentHealth = startingHealth;
	playerRigidbody = GetComponent (Rigidbody2D);
	animator = GetComponent (Animator);
	
	// Get location for spawning shot
	for (var child in GetComponentsInChildren (Transform)) {
		if (child.tag == "ShotSpawn") {
			shotSpawn = child as Transform; 
			break;
		}
	}
}

function Start () {
	
}

function Update () {

  	// Store the input axes.
    var h : float = Input.GetAxisRaw ("Horizontal");
    var v : float = Input.GetAxisRaw ("Vertical");
    
    // Move the player around the scene.
    Move (h, v);
	
	SetAnimationState();  
	  
	// Fire shot at rate set in unity
	if (Input.GetButton("Fire1") && Time.time > nextFire)
    {
        nextFire = Time.time + fireRate;
        var shotClone = Instantiate(shot, shotSpawn.position, shotSpawn.rotation);
        var shotCloneBody : Rigidbody2D = shotClone.GetComponent(Rigidbody2D);
        
        // rotate object and toss to it's right (so it looks like it's swimming forward)
        shotClone.transform.Rotate(Vector3.forward, 90);
        shotCloneBody.AddForce(shotClone.transform.right * shotSpeed);
    }
}

function FixedUpdate ()
{
    // Store the input axes.
    var h : float = Input.GetAxisRaw ("Horizontal");
    var v : float = Input.GetAxisRaw ("Vertical");

    // Check the direction the player is facing.
    CheckDirection (h, v);
    
    // Decrease hp over time
    currentHealth -= ( 1 * Time.deltaTime );
    healthSlider.value = currentHealth;
}

function CheckDirection (h : float, v : float) {
	// calculate angle between up and movement directions
	// use cross product to determine angle clockwise-ness
	var angle = Vector2.Angle(new Vector2(0, 1), new Vector2(h, v));
	var cross = Vector3.Cross(new Vector2(0, 1), new Vector2(h, v));
	if (cross.z < 0){
		angle = 360 - angle;
	}
	
	// rotate shotspawn about blue axis
	shotSpawn.rotation = Quaternion.Euler(0, 0, angle);
}

function Move (h : float, v : float)
{
    // Set the movement vector based on the axis input.
    movement.Set(h, v);
    
    // Normalise the movement vector and make it proportional to the speed per second.
    movement = movement.normalized * speed * Time.deltaTime;

    // Move the player to it's current position plus the movement. 	
    playerRigidbody.MovePosition (transform.position + movement);
    
    // Movement consumes hp
    if (movement.x != 0 || movement.y != 0) {
    	currentHealth -= ( 10 * Time.deltaTime );
    }
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

function SetAnimationState ()
{
	var vertical = Input.GetAxis("Vertical");
    var horizontal = Input.GetAxis("Horizontal");
 
	if (vertical > 0)
	{
	    animator.SetInteger("Direction", 2);
	}
	else if (vertical < 0)
	{
	    animator.SetInteger("Direction", 0);
	}
	else if (horizontal > 0)
	{
	    animator.SetInteger("Direction", 3);
	}
	else if (horizontal < 0)
	{
	    animator.SetInteger("Direction", 1);
	}
	else
	{ 
		animator.SetBool("IsMoving", false);
	}
}

function Death ()
{
    // Set the death flag so this function won't be called again.
    isDead = true;
}