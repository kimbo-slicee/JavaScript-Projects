/*Code withe Singleton Pattern*/
const ticTacToeGame = {
    elements: {
        // UI elements used in the game
        optionButtons: document.querySelectorAll(".options button"),
        playerIndicators: document.querySelectorAll(".players span"),
        slider: document.querySelector(".slider"),
        selectBox: document.querySelector(".select-box"),
        playBoard: document.querySelector(".play-board"),
        boxes: document.querySelectorAll("section span"),
        replayButton: document.querySelector(".btn button"),
        resultBox: document.querySelector(".result-box"),
    },

    state: {
        // Track current player and game status
        currentPlayer: '',
        isGameOver: false,
        bootTurn:false
    },

    icons: {
        // SVG icons for players X and O
        getO: () => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" font-weight="800">
        <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
      </svg>
    `,
        getX: () => `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" font-weight="800">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
      </svg>
    `
    },
    /**
     * Handle user selecting X or O at game start
     */
    handlePlayerSelection() {
        this.elements.optionButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Set current player based on clicked button class
                this.state.currentPlayer = button.classList[0].includes('X') ? "X" : "O";
                this.updateTurnIndicator();
                // Hide selection UI and show game board
                this.elements.selectBox.classList.replace("show", "hide");
                setTimeout(() => {
                    this.elements.playBoard.classList.add("show");
                }, 300); // Allow animation before showing board
            });
        });
    },
    /**
     * Update UI to reflect the current player's turn
     */
    updateTurnIndicator() {
        // Highlight current player's indicator
        this.elements.playerIndicators.forEach(el => {
            el.classList.toggle("active", el.className.includes(this.state.currentPlayer));
        });
        // Move slider to the correct side based on turn
        this.elements.slider.style.transform =
            this.state.currentPlayer === "X" ? "translateX(0)" : "translateX(100%)";
    },
    /**
     * Setup click handlers for all boxes on the board
     */
    handleBoxClick() {
        this.elements.boxes.forEach(box => {
            box.addEventListener("click", () => this.displayIcon(box));
        });
    },
    /**
    * change turn
    * */
    goToNextTurn (){
        this.state.currentPlayer==="X"?this.state.currentPlayer="O":this.state.currentPlayer="X";
        this.state.bootTurn=!this.state.bootTurn
        this.updateTurnIndicator();
    },
    /**
     * Display the current player's icon inside the clicked box
     */
    displayIcon(box) {
        if (!box.classList.contains("clicked")) {
            const current = this.state.currentPlayer;
            box.innerHTML = current === "X" ? this.icons.getX() : this.icons.getO();
            box.classList.add("clicked");
            this.goToNextTurn();
            if (this.state.bootTurn){
                this.elements.boxes.forEach(box=>box.classList.add("pending"))
                setTimeout(() => this.bootTurn(), 1000);
            }
            this.endGame();
        }
    },
    bootTurn(){
        const availableBoxes = [...this.elements.boxes].filter(box => !box.classList.contains("clicked"));
        if (availableBoxes.length === 0)return;
        const randomIndex = Math.floor(Math.random() * availableBoxes.length);
        availableBoxes[randomIndex].click();
        [...this.elements.boxes].forEach(box=>box.classList.remove("pending"));
        this.state.bootTurn=false;
    },
    /**
     * check winner if some one winne
     */
    winner(){
    //the algorithm to check the winner
    const winPatterns = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal TL-BR
        [2, 4, 6]  // diagonal TR-BL
    ];
    const boxes=[...this.elements.boxes].map((box)=>{
        if(box.innerHTML.includes("svg")){
            return box.innerHTML.includes("path d=\"M480-80") ? "O" : "X";
        }
        return null;
    })
        for (const winPattern of winPatterns) {
            const [a,b,c]=winPattern;
            if(boxes[a] && boxes[a]===boxes[b] && boxes[b]===boxes[c]){
            this.showResultBox()
            this.elements.resultBox.innerHTML=`player <span>${this.state.currentPlayer}</span>Winne`
            }
        }
    },
    /*showing draw if no one winne */
    draw(){
        this.showResultBox();
        this.elements.resultBox.innerHTML=`<span>X</span><span>O</span> Draw`
    },
    endGame(){
       [...this.elements.boxes].every(box=>box.classList.contains("clicked"))?this.draw():this.winner();
    },
    showResultBox(){
        this.elements.playBoard.classList.replace("show","hide");
        setTimeout(()=>this.elements.resultBox.classList.add("show"),500);
    },

    /**
     * Initialize the game: set up events
     */
     init() {
        this.handlePlayerSelection();
        this.handleBoxClick();
    }
};

// Start the game
ticTacToeGame.init();
