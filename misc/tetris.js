class Mino {
	constructor(name, pattern) {
		this.name = name;
		this.data = [pattern];

		for (let x = 0; x < 3; x++) {
			let a = [];
			for (let y = 0; y < 4; y++) {
				a.push([0, 0]);
			}
			this.data.push(a);
		}

		for (let x = 0; x < 3; x++) {
			for (let y = 0; y < 4; y++) {
				this.data[x + 1][y][0] = this.data[x][y][1];
				this.data[x + 1][y][1] = -this.data[x][y][0];
			}
		}
	}
}

const Tetromino = {
	I: new Mino("I", [[-1, 0], [0, 0], [1, 0], [2, 0]]),
	J: new Mino("J", [[-1, 1], [-1, 0], [0, 0], [1, 0]]),
	L: new Mino("L", [[-1, 0], [0, 0], [1, 0], [1, 1]]),
	O: new Mino("O", [[0, 0], [0, 1], [1, 1], [1, 0]]),
	S: new Mino("S", [[-1, 0], [0, 0], [0, 1], [1, 1]]),
	Z: new Mino("Z", [[-1, 1], [0, 1], [0, 0], [1, 0]]),
	T: new Mino("T", [[-1, 0], [0, 0], [0, 1], [1, 0]]),
};

class Frame {
	constructor(height) {
		this.width = 10;
		this.height = height;

		this.field = Array.from(Array(this.height), () => new Array(this.width));

		for (let h = 0; h < this.height; h++) {
			for (let w = 0; w < this.width; w++) {
				this.field[h][w] = '_';
			}
		}
	}

	set(x, y, value) {
		if (y < 0 || y >= this.height || x < 0 || x >= this.width) return;
		this.field[y][x] = value;
	}

	write(piece, orientation, x, y) {
		for (let data of piece.data[orientation]) {
			this.set(data[0] + x, data[1] + y, piece.name);
		}
	}

	printFrame() {
		for (let h = this.height - 1; h >= 0; h--) {
			let line = "";
			for (let w = 0; w < this.width; w++) {
				line += this.field[h][w];
			}
			console.log(`${h}: ${line}`);
		}
	}
}

exports.Tetromino = Tetromino;
exports.Frame = Frame;