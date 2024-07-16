class TicTacToe {
    private boardLen: number;
    
    constructor(private board: string[][]) {
        this.boardLen = board.length;
    }

    public checkWinner(): string {
        const lastIndex: number = this.boardLen - 1;

        // Vertical
        outerLoop: for (let i = 0; i <= lastIndex; i++) {
            if (this.board[0][i] !== "") {
                for (let j = 1; j <= lastIndex; j++) {
                    if (this.board[0][i] !== this.board[j][i]) {
                        continue outerLoop;
                    }
                }
                return this.board[0][i];
            }
        }

        // Horizontal
        outerLoop: for (let i = 0; i <= lastIndex; i++) {
            if (this.board[i][0] !== "") {
                for (let j = 1; j <= lastIndex; j++) {
                    if (this.board[i][0] !== this.board[i][j]) {
                        continue outerLoop;
                    }
                }
                return this.board[i][0];
            }
        }
        
        // Diagonal
        const topLeft: string = this.board[0][0];
        const topRight: string = this.board[0][lastIndex];
        let forwardDiag: boolean = false;
        let backwardDiag: boolean = false;
        if (topLeft !== "") {
            forwardDiag = true;
            for (let i = 1; i <= lastIndex; i++) {
                if (topLeft !== this.board[i][i]) {
                    forwardDiag = false;
                    break;
                }
            }
        }
        if (topRight !== "") {
            backwardDiag = true;
            for (let i = 1; i <= lastIndex; i++) {
                if (topRight !== this.board[i][lastIndex - i]) {
                    backwardDiag = false;
                    break;
                }
            }
        }
        if (forwardDiag) {
            return topLeft;
        }
        if (backwardDiag) {
            return topRight;
        }

        // 4 Corners
        if (topLeft !== "" && topLeft === topRight && topLeft === this.board[lastIndex][0] && topLeft === this.board[lastIndex][lastIndex]) {
            return topLeft;
        }

        // 2x2 box
        const boxLen: number = 2;
        for (let i = 0; i <= this.boardLen-boxLen; i++) {
            outerLoop: for (let j = 0; j <= this.boardLen-boxLen; j++) {
                if (this.board[i][j] !== "") {
                    for (let x = i; x < i+boxLen; x++) {
                        for (let y = j; y < j+boxLen; y++) {
                            if (this.board[i][j] !== this.board[x][y]) {
                                continue outerLoop;
                            }
                        }
                    }
                    return this.board[i][j];
                }
            }
        }

        return "";
    }

    public anyMovesLeft(): boolean {
        for (let i = 0; i < this.boardLen; i++) {
            for (let j = 0; j < this.boardLen; j++) {
                if (this.board[i][j] === "") {
                    return true;
                }
            }
        }
        
        return false;
    }

    public isGameOver(): boolean {
        const winner: string = this.checkWinner();
        if (winner) {
            return true;
        }

        const movesLeft: boolean = this.anyMovesLeft();
        if (movesLeft) {
            return false;
        } else {
            return true;
        }
    }
}