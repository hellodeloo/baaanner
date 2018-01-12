// 1 secondes = 1000;

// Global Const
let loopInit = 0;
const loopMax = 10;

// Functions
function switchScene(current) {
  const allScenes = document.getElementById('ba-container').childNodes.length;
  const currentScene = document.getElementById(current);
  for (let i = 0; i < allScenes; i++) {
    document.getElementById('ba-container').childNodes[i].className = '';
  }
  currentScene.className = 'is-current';
}

function switchStep(current) {
  const currentStep = document.getElementById(current);
  currentStep.className = 'is-playing';
}

function clearStep(parent) {
  const parentStep = document.getElementById(parent).childNodes.length;
  for (let i = 0; i < parentStep; i++) {
    document.getElementById(parent).childNodes[i].className = '';
  }
}

// Scenes
function scene01() {
  switchScene('ba-content__scene-01');
  switchStep('ba-content__scene-01__step-01');
  clearStep('ba-content__scene-02');

  setTimeout(scene01Step02, 3000);
}

function scene01Step02() {
  clearStep('ba-content__scene-01');
  switchStep('ba-content__scene-01__step-02');

  setTimeout(scene02, 3000);
}

function scene02() {
  switchScene('ba-content__scene-02');
  switchStep('ba-content__scene-02__step-01');
  clearStep('ba-content__scene-01');

  loopInit++;
  if (loopInit < loopMax) {
    setTimeout(scene01, 4000);
  }
}
