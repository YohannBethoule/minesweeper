import {reactive} from "vue";
import Cell from "./Cell.ts";

class Grid {
    private readonly minesCount: number;
    grid: Cell[][];

    constructor(sizeX: number, sizeY: number, minesCount: number) {
        this.grid = reactive([]);
        for (let i = 0; i < sizeX; i++) {
            this.grid[i] = [];
            for (let j = 0; j < sizeY; j++) {
                this.grid[i][j] = new Cell(i, j, 0);
            }
        }
        this.minesCount = minesCount;
    }

    public initGrid(startX: number, startY: number) {
        this.addMines(this.minesCount, startX, startY);
        this.addNumbers();
    }

    public revealCell(x: number, y: number): boolean {
        if (this.grid[x][y].value === -1) {
            return false;
        }
        this.grid[x][y].hidden = false;
        if (this.grid[x][y].value === 0) {
            this.revealEmptyCells(x, y);
        }
        return true;
    }

    private revealEmptyCells(x: number, y: number) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (x + i >= 0 && x + i < this.grid.length && y + j >= 0 && y + j < this.grid[0].length) {
                    if (this.grid[x + i][y + j].hidden) {
                        this.grid[x + i][y + j].hidden = false;
                        if (this.grid[x + i][y + j].value === 0) {
                            this.revealEmptyCells(x + i, y + j);
                        }
                    }
                }
            }
        }
    }

    private addMines(minesCount: number, startX: number, startY: number) {
        let mines = 0;
        while (mines < minesCount) {
            let x = Math.floor(Math.random() * this.grid.length);
            let y = Math.floor(Math.random() * this.grid[0].length);
            if (this.grid[x][y].value !== -1 && (x !== startX || y !== startY)) {
                this.grid[x][y].value = -1;
                mines++;
            }
        }
    }

    private addNumbers() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                if (this.grid[i][j].value !== -1) {
                    this.grid[i][j].value = this.countMines(i, j);
                }
            }
        }
    }

    private countMines(x: number, y: number): number {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (x + i >= 0 && x + i < this.grid.length && y + j >= 0 && y + j < this.grid[0].length) {
                    if (this.grid[x + i][y + j].value === -1) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
}

export default Grid;