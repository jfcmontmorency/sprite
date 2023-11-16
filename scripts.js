const states = {
  Idle: 8,
  Run: 8,
  Jump: 2,
  Fall: 2,
  Attack1: 5,
  Attack2: 5,
  Attack3: 7,
  TakeHit: 3,
  Death: 8,
};

document.documentElement.style.setProperty("--speed", "1s");
document.documentElement.style.setProperty("--url", 'url("./images/Run.png")');
document.documentElement.style.setProperty("--steps", "8");

document.addEventListener("keyup", (event) => {
  const isNumber = /^[0-9]$/i.test(event.key);
  if (!isNumber) return;

  const key = Object.keys(states)[Math.max(0, event.key - 1)];
  document.documentElement.style.setProperty(
    "--url",
    'url("./images/' + key + '.png")'
  );
  document.documentElement.style.setProperty("--steps", states[key]);

  updateSpeed();

  // Change la couleur de fond
  const body = document.getElementsByTagName("body")[0];
  removeClassByPrefix(body, "bg-");
  body.classList.add("bg-" + event.key);
});

document.addEventListener("click", () => {
  document.getElementsByTagName("body")[0].classList.toggle("learning-mode");
  updateSpeed();
});

function updateSpeed() {
  const speed = document.documentElement.style.getPropertyValue("--speed");
  const steps = document.documentElement.style.getPropertyValue("--steps");

  if (document.getElementsByTagName("body")[0].classList.contains("learning-mode")) {
    document.documentElement.style.setProperty("--speed", (steps * 2) + "s");
  } else {
    document.documentElement.style.setProperty("--speed", (0.1 * steps) + "s");
  }

  document.getAnimations().forEach((anim) => {
    anim.cancel();
    anim.play();
  });
}

// https://thegermancoder.com/2018/10/04/how-to-remove-classes-by-prefix-in-vanilla-javascript/
function removeClassByPrefix(node, prefix) {
  let regx = new RegExp("\\b" + prefix + "[^ ]*[ ]?\\b", "g");
  node.className = node.className.replace(regx, "");
  return node;
}
