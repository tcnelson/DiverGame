#pragma strict

private var text : UnityEngine.UI.Text;
private var score : Score;

function Awake() {
	text = GetComponent(UnityEngine.UI.Text);
	score = GameObject.FindGameObjectWithTag("GameController").GetComponent(Score);
}

function Update () {
	text.text = score.current.ToString("0000000000");
}