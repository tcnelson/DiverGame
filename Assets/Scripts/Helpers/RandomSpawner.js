#pragma strict

var prefab : GameObject;               		// The oxygen prefab to be spawned.
var spawnTime : float = 4f;            		// How long between each spawn.
var spawns : GameObject;

var container : Transform;

private var spawnPoints : Transform[]; 		// An array of the spawn points this oxygen can spawn from.

function Awake() {
	var temp = spawns.GetComponentsInChildren(Transform);
	spawnPoints = new Transform[temp.Length -1];
	
    for (var i = 1; i < temp.Length; i++) {
    	spawnPoints[i-1] = temp[i] as Transform;
    }
}

function Start ()
{
    // Call the Spawn function after a delay of the spawnTime and then continue to call after the same amount of time.
    InvokeRepeating ("Spawn", spawnTime, spawnTime);
}

function Spawn ()
{
    // Find a random index between zero and one less than the number of spawn points.
    var spawnPointIndex : int = Random.Range (0, spawnPoints.Length);

	var parent = spawnPoints[spawnPointIndex];
	var children = container.GetComponentsInChildren(Transform);
	if (children.Length > 1) {
		return;
	}

    // Create an instance of the prefab at the randomly selected spawn point's position and rotation.
    var clone = Instantiate (prefab, parent.position, parent.rotation);
    clone.transform.parent = container;
}