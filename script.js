var spinBtn = document.getElementById("spin-btn");
var box = document.getElementById("box");
var wheelSpinning = false;
var spinCount = 0;

spinBtn.addEventListener("click", rotateFunc);

function rotateFunc() {
  if (!wheelSpinning) {
    box.style.animation = "";
    var deg = Math.floor(2000 + Math.random() * 2000);
    var rotation = deg * spinCount;

    box.style.transform = "rotate(" + rotation + "deg)";
    wheelSpinning = true;
    spinCount++;
    spinBtn.disabled = true;

    setTimeout(function () {
      wheelSpinning = false;
      spinBtn.disabled = false;
      if (spinCount === 1) {
        stopOnTryAgain();
      } else if (spinCount === 2) {
        stopOnCoupon();
      }
    }, deg);
  }
}

function stopOnTryAgain() {
  var currentRotation = getRotation(box);
  var rotateTo = Math.floor(currentRotation / 90) * 90 - 45;
  box.style.transform = "rotate(" + rotateTo + "deg)";
}

function stopOnCoupon() {
  var currentRotation = getRotation(box);
  var rotateTo = Math.floor(currentRotation / 90) * 90 + 45;
  box.style.transform = "rotate(" + rotateTo + "deg)";
}

function getRotation(element) {
  var matrix = window.getComputedStyle(element, null).getPropertyValue("transform");
  var matrixValues = matrix.split("(")[1].split(")")[0].split(",");
  var a = matrixValues[0];
  var b = matrixValues[1];
  var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  return angle;
}
