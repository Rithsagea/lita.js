import { Frame, Tetromino } from './tetris.js';

//test tetromino position
for (let r = 0; r < 4; r++) {
	let frames = [];

	for (const v in Tetromino) {
		const frame = new Frame(5);
		frame.write(Tetromino[v], r, 2, 2);
		// frame.set(2, 2, '.');

		frames.push(frame);
	}

	for (let y = 4; y >= 0; y--) {
		let line = '';
		for (let m = 0; m < 7; m++) {
			for (let x = 0; x < 5; x++) {
				line += frames[m].field[y][x];
			}
			line += ' ';
		}
		console.log(line);
	}

	console.log('-------------------------------------------');
}