#pragma strict

var treasure : GameObject;             // The treasure prefab to be spawned.
var spawnTime : float = 5f;            // How long between each spawn.
var spawnPoints : Transform[];         // An array of the spawn points this treasure can spawn from.


function Start ()
{
    // Call the Spawn function after a delay of the spawnTime and then continue to call after the same amount of time.
    InvokeRepeating ("Spawn", spawnTime, spawnTime);
}


function Spawn ()
{
    // Find a random index between zero and one less than the number of spawn points.
    var spawnPointIndex : int = Random.Range (0, spawnPoints.Length);

    // Create an instance of the enemy prefab at the randomly selected spawn point's position and rotation.
    Instantiate (treasure, spawnPoints[spawnPointIndex].position, spawnPoints[spawnPointIndex].rotation);
}