﻿#pragma strict

var oxygen : GameObject;               // The oxygen prefab to be spawned.
var spawnTime : float = 4f;            // How long between each spawn.
var spawnPoints : Transform[];         // An array of the spawn points this oxygen can spawn from.


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
    Instantiate (oxygen, spawnPoints[spawnPointIndex].position, spawnPoints[spawnPointIndex].rotation);
}