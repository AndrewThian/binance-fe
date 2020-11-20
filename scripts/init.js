function startUp() {
  const canvas = document.getElementById("canvas");

  canvasHeight = canvas.height;
  canvasWidth = canvas.width;

  const context = canvas.getContext("2d");

  return context;
}

async function init() {
  const ctx = startUp();
}

window.addEventListener("DOMContentLoaded", init);
