class Cell {
  public x: number;
  public y: number;
  public value: number;
  public hidden: boolean;

  constructor(x: number, y: number, value: number) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.hidden = true;
  }
}

export default Cell;