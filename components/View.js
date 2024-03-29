class View {
  constructor(setting) {
    this._setting = setting;
    this._element = document.querySelector(this._setting.elementSelector);
    this._width = this._setting.width;
    this._height = this._setting.height;
    this._rows = this._setting.rows;
    this._columns = this._setting.columns;

    this._canvas = document.createElement('canvas');
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    this._context = this._canvas.getContext('2d');

    this._playfieldBorderWidth = 4;
    this._playfieldX = this._playfieldBorderWidth;
    this._playfieldY = this._playfieldBorderWidth;
    this._playfieldWidth = this._width * 2 / 3;
    this._playfieldHeight = this._height;
    this._playfieldInnerWidth = this._playfieldWidth - this._playfieldBorderWidth * 2;
    this._playfieldInnerHeight = this._playfieldHeight - this._playfieldBorderWidth * 2;
    this._blockWidth = this._playfieldInnerWidth / this._columns;
    this._blockHeight = this._playfieldInnerHeight / this._rows;
    this._panelX = this._playfieldWidth + 10;
    this._panelY = 0;
    this._panelWidth = this._width / 3;
    this._panelHeight = this._height;

    this._element.appendChild(this._canvas);
  }

  _renderPanel = ({ level, score, lines, nextPiece }) => {
    this._context.textAlign = 'start';
    this._context.textBaseline = 'top';
    this._context.fillStyle = '#de5c6b';
    this._context.font = '14px "Roboto"';

    this._context.fillText(`Score ${score}`, this._panelX, this._panelY + 0);
    this._context.fillText(`Lines ${lines}`, this._panelX, this._panelY + 24);
    this._context.fillText(`Level ${level}`, this._panelX, this._panelY + 48);
    this._context.fillText('Next:', this._panelX, this._panelY + 96);

    this._renderInfoPanel(nextPiece);
  }

  _renderInfoPanel = (nextPiece) => {
    for (let y = 0; y < nextPiece.blocks.length; y++) {
      for (let x = 0; x < nextPiece.blocks[y].length; x++) {
        const block = nextPiece.blocks[y][x];
        if (block) {
          this._renderBlock(
            this._panelX + (x * this._blockWidth * 0.5),
            this._panelY + 120 + (y * this._blockHeight * 0.5),
            this._blockWidth * 0.5,
            this._blockHeight * 0.5,
            '#3087E7'
          );
        }
      }
    }
  }

  _renderBlock = (x, y, width, height, color) => {
    this._context.fillStyle = color;
    this._context.strokeStyle = '#de5c6b';
    this._context.lineWidth = 2;
    this._context.fillRect(x, y, width, height);
    this._context.strokeRect(x, y, width, height);
  }

  _renderPlayField = ({ playfield }) => {
    for (let y = 0; y < playfield.length; y++) {
      const line = playfield[y];
      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block) {
          this._renderBlock(
            this._playfieldX + (x * this._blockWidth),
            this._playfieldY + (y * this._blockHeight),
            this._blockWidth,
            this._blockHeight,
            '#6be1ec'
          );
        }
      }
    }

    this._context.lineWidth = this._playfieldBorderWidth;
    this._context.strokeStyle = '#E4E4E4';
    this._context.strokeRect(0, 0, this._playfieldWidth, this._playfieldHeight);
  }

  _clearScreen = () => {
    this._context.clearRect(0, 0, this._width, this._height);
  }

  renderEndScreen = ({ score }) => {
    this._clearScreen();
    this._context.fillStyle = 'white';
    this._context.font = '18px "Roboto"';
    this._context.textAlign = 'center';
    this._context.textBaseline = 'middle';
    this._context.fillText('GAME OVER', this._width / 2, this._height / 2 - 48);
    this._context.fillText(`Score: ${score}`, this._width / 2, this._height / 2);
    this._context.fillText('Press ENTER to restart', this._width / 2, this._height / 2 + 48);
  }

  renderPauseScreen = () => {
    this._context.fillStyle = 'rgba(45, 44, 51, 0.75)';
    this._context.fillRect(0, 0, this._width, this._height);
    this._context.fillStyle = 'white';
    this._context.font = '18px "Roboto"';
    this._context.textAlign = 'center';
    this._context.textBaseline = 'middle';
    this._context.fillText('Press ENTER to resume', this._width / 2, this._height / 2);
  }

  renderStartScreen = () => {
    this._context.fillStyle = 'white';
    this._context.font = '18px "Roboto"';
    this._context.textAlign = 'center';
    this._context.textBaseline = 'middle';
    this._context.fillText('Press ENTER to start', this._width / 2, this._height / 2);
  }

  renderMainScreen = (state) => {
    this._clearScreen();
    this._renderPlayField(state);
    this._renderPanel(state);
  }
}

export default View;
