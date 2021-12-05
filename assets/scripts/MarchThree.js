const MatchThree = {
  level: 1,
  movesRemaining: 0,
  itemsRemaining: 0,
  points: 0,
  itemsIndexes: [],
  renderGrid: function (rows) {
    let index = 0;
    const gridContainer = document.querySelector('.grid');
    gridContainer.innerHTML = '';
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rows; j++) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.style.width = `calc(100% / ${rows})`;
        gridItem.setAttribute('index', index.toString());
        gridContainer.appendChild(gridItem);
        index++;
      }
    }
    this.handleGridItemsClicks();
    this.handleItemsPlaces();
    console.log("Items indexes: " + this.itemsIndexes);
  },
  popupMessageHandler(message, state) {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(el => {
      el.removeEventListener('click', this.handleClicks);
    });
    const messageDiv = document.querySelector(`.${state}`);
    messageDiv.style.display = 'block';
    messageDiv.childNodes[1].innerHTML = message;
    if (message == "YOU WON")
      messageDiv.childNodes[3].innerHTML = "Go back to level 1";
  },
  popupMessage: function (message) {
    switch (message) {
      case 'You failed':
        this.popupMessageHandler(message, "failed");
        break;
      case 'Level complete':
        this.popupMessageHandler(message, "success");
        break;
      case 'YOU WON':
        this.popupMessageHandler(message, "success");
        break;
    }
  },
  handleClicks: function (event) {
    const itemIndex = event.target.getAttribute('index');
    MatchThree.setMovesValue(MatchThree.movesRemaining - 1);
    event.target.removeEventListener('click', MatchThree.handleClicks);
    if (MatchThree.itemsIndexes.filter(x => x == itemIndex).length != 0) {
      event.target.style.backgroundImage = "url('./assets/images/gold_key.jpg')";
      MatchThree.setItemsValue(MatchThree.itemsRemaining - 1);
      MatchThree.setPointsValue(MatchThree.points + 50);
      if (MatchThree.itemsRemaining == 0 && MatchThree.level == 3) {
        MatchThree.popupMessage('YOU WON');
        return;
      }
      if (MatchThree.itemsRemaining == 0) {
        MatchThree.popupMessage('Level complete');
        return;
      }
      if (MatchThree.movesRemaining == 0) {
        MatchThree.popupMessage('You failed');
      }
      return;
    }
    event.target.style.background = 'white';
    if (MatchThree.movesRemaining == 0) {
      MatchThree.popupMessage('You failed');
    }
  },
  handleGridItemsClicks: function () {
    const gridItems = document.querySelectorAll('.grid-item');
    for (let i = 0; i < gridItems.length; i++) {
      gridItems[i].addEventListener('click', this.handleClicks);
    }
  },
  handleItemsPlaces: function () {
    this.itemsIndexes = [];
    const gridItems = document.querySelectorAll('.grid-item');
    while (this.itemsIndexes.length !== this.itemsRemaining) {
      let randomNumber = Math.ceil(Math.random() * gridItems.length) - 1;
      if (this.itemsIndexes.includes(randomNumber))
        continue;
      this.itemsIndexes.push(randomNumber);
    }
  },
  setMovesValue: function (moves) {
    this.movesRemaining = moves;
    const movesElem = document.getElementById('moves-remaining');
    movesElem.innerHTML = moves;
  },
  setItemsValue: function (items) {
    this.itemsRemaining = items;
    const itemsElem = document.getElementById('items-remaining');
    itemsElem.innerHTML = items;
  },
  setPointsValue: function (pointsVal) {
    this.points = pointsVal;
    const pointsElem = document.getElementById('points');
    pointsElem.innerHTML = pointsVal;
  },
  setSidebarValues: function (moves, items, points) {
    this.setMovesValue(moves);
    this.setItemsValue(items);
    this.setPointsValue(points);
  },
  infoMessage() {
    document.querySelector('.info').style.display = "block";
    document.querySelector('.info > p').innerHTML = "Collect 5 gold keys.";
  },
  changeLevel: function (newLevel) {
    switch (newLevel) {
      case 1:
        this.infoMessage();
        this.setSidebarValues(20, 5, 0);
        this.renderGrid(5);
        break;
      case 2:
        this.setSidebarValues(20, 5, 0);
        this.renderGrid(7);
        this.infoMessage();
        break;
      case 3:
        this.setSidebarValues(20, 5, 0);
        this.renderGrid(9);
        this.infoMessage();
        break;
    }
    this.level = newLevel;
  }
};