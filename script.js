document.addEventListener('DOMContentLoaded', () => {
  const fishList = [
    { name: "arrowana", price: 1400 },
    { name: "Discus", price: 125 },
    { name: "Dwarf chicilid", price: 120 },
    { name: "TobyPufferfish", price: 55 },
    { name: "Beta", price: 35 },
    { name: "butterflyFish", price: 30 },
    { name: "oscar", price: 21 },
    { name: "catfish", price: 20 },
    { name: "angelfish", price: 15 },
    { name: "gourami", price: 10 }
  ];

  let money = 500;

  const fishContainer = document.getElementById('fishContainer');
  const resultContainer = document.getElementById('resultContainer');
  const moneyDisplay = document.getElementById('moneyDisplay');
  const checkFishBtn = document.getElementById('checkFishBtn');
  const cartoonFish = document.getElementById('cartoonFish');

  fishList.forEach((fish) => {
    const fishElement = document.createElement('div');
    fishElement.className = 'fish';

    const fishImage = new Image();
    fishImage.src = `images/${fish.name}.jpg`;
    fishImage.alt = fish.name;

    const fishPrice = document.createElement('p');
    fishPrice.textContent = `Price: $${fish.price}`;

    const fishName = document.createElement('p');
    fishName.textContent = fish.name;

    fishElement.appendChild(fishImage);
    fishElement.appendChild(fishName);
    fishElement.appendChild(fishPrice);
    fishContainer.appendChild(fishElement);

    fishElement.addEventListener('click', () => {
      buyFish(fish.name, fishElement);
    });
  });

  function buyFish(fishName, fishElement) {
    if (!fishElement.classList.contains('sold-out')) {
      const selectedFish = fishList.find((fish) => fish.name === fishName);

      if (money >= selectedFish.price) {
        money -= selectedFish.price;
        updateMoneyDisplay();
        displayResult(`You bought a ${selectedFish.name} for $${selectedFish.price}.`);
        fishElement.classList.add('sold-out');
        fishElement.style.cursor = 'not-allowed';
        fishElement.style.border = 'none';

        const soldOutOverlay = document.createElement('div');
        soldOutOverlay.className = 'sold-out-overlay';
        const overlayImage = new Image();
        overlayImage.src = 'images/soldout.jpg';
        overlayImage.alt = 'Sold Out';
        soldOutOverlay.appendChild(overlayImage);
        fishElement.appendChild(soldOutOverlay);
      } else {
        displayResult("You don't have enough money to buy this fish.");
      }
    }
  }

  function updateMoneyDisplay() {
    moneyDisplay.textContent = money;
  }

  function displayResult(message) {
    resultContainer.textContent = message;
  }

  checkFishBtn.addEventListener('click', () => {
    let availableFishCount = 0;
    const fishElements = document.getElementsByClassName('fish');

    Array.from(fishElements).forEach((fishElement) => {
      if (!fishElement.classList.contains('sold-out')) {
        fishElement.querySelector('img').style.border = '2px solid green';
        availableFishCount++;
      } else {
        fishElement.querySelector('img').style.border = 'none';
      }
    });

    if (availableFishCount === 0) {
      displayResult('All fish are sold out.');
    } else {
      displayResult(`There are ${availableFishCount} fish available for purchase.`);
    }
  });

  function getRandomPosition() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const maxX = windowWidth - cartoonFish.offsetWidth;
    const maxY = windowHeight - cartoonFish.offsetHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    return { x: randomX, y: randomY };
  }

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  const stepSize = 4; // Adjust the step size as needed

  function moveFish() {
    const deltaX = targetX - currentX;
    const deltaY = targetY - currentY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (distance > stepSize) {
      const ratio = stepSize / distance;
      currentX += ratio * deltaX;
      currentY += ratio * deltaY;
    } else {
      const position = getRandomPosition();
      targetX = position.x;
      targetY = position.y;
    }

    cartoonFish.style.left = `${currentX}px`;
    cartoonFish.style.top = `${currentY}px`;

    requestAnimationFrame(moveFish);
  }

  moveFish();

  cartoonFish.addEventListener('click', collectMoney);

  function collectMoney() {
    money += 5;
    updateMoneyDisplay();
    displayResult('You collected 5 coins from the fish!');
  }
});
