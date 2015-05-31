#pragma strict

var speed : float;            					// The speed that the player will move at.
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

private var playerHealth : PlayerHealth;		// Reference to player health

function Awake() {
	playerRigidbody = GetComponent (Rigidbody2D);
	animator = GetComponent (Animator);
	playerHealth = GameObject.FindGameObjectWithTag("GameController").GetComponent(PlayerHealth);
	
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
	  
  	var canFire : boolean = Time.time > nextFire;
  	var firing : boolean = (Input.GetButton("Fire1") || Input.GetButton("Fire6"));
	// Fire shot at rate set in unity (use is probably holding the fire button)
	if (canFire && firing) {
        nextFire = Time.time + fireRate;
        var shotClone = Instantiate(shot, shotSpawn.position, shotSpawn.rotation);
        var shotCloneBody : Rigidbody2D = shotClone.GetComponent(Rigidbody2D);
        
        // rotate object and toss to it's right (so it looks like it's swimming forward)
        shotClone.transform.Rotate(Vector3.forward, 90);
        shotCloneBody.AddForce(shotClone.transform.right * shotSpeed);
    // if user is not touching fire buttons (manually engaging the trigger each fire)
    } else if (!canFire && !firing) {
    	// reward manual triggers, remove half remaining firetime
    	 nextFire = Time.time + 0.5 * (nextFire - Time.time);
    }
}

function FixedUpdate ()
{
    // Store the input axes.
    var h : float = Input.GetAxisRaw ("Horizontal2");
    var v : float = Input.GetAxisRaw ("Vertical2");

    // Check the direction the player is facing.
    CheckDirection (h, v);
    
    // If the player has lost all it's health and the death flag hasn't been set yet...
    if(playerHealth.currentHealth <= 0 && !isDead)
    {
        // ... it should die.
        Die ();
    }
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
    	playerHealth.Damage( 1 * Time.deltaTime );
    } else {
    	playerHealth.Damage(0.1 * Time.deltaTime);
    }
}

public function Heal (amount : float) {
	playerHealth.Heal(amount);
}

public function Damage (amount : float)
{
    // Set the damaged flag so the screen will flash.
    damaged = true;

    // Reduce the current health by the damage amount.
    playerHealth.Damage(amount);

    // Play the hurt sound effect.
    //playerAudio.Play ();
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
}

function Die ()
{
    // Set the death flag so this function won't be called again.
    isDead = true;
}