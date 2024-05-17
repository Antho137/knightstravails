const square = (x, y, visited = false, level = null) => {
    return {
        x,
        y,
        visited,
        level,
    };
};

const gameBoard = (size) => {
    // makes board
    const make = () => {
        const arr = [];
        for (let x = 0; x <= size; x++) {
            const yarr = [];
            for (let y = 0; y <= size; y++) {
                yarr.push(square(x, y));
            }
            arr.push(yarr);
        }
        return arr.flat();
    };
    // assigns it to variable
    const board = make();

    // finds specified square
    const find = (x, y) => {
        for (let i = 0; i < board.length; i++) {
            if (board[i].x === x && board[i].y === y) {
                return board[i];
            }
        }
        return null;
    };
    return {
        board,
        find,
    };
};

const format = (moves) => {
    // get last square (the destination)
    let square = moves[moves.length - 1];
    
    // get array of path 
    let arr = [];
    while (square != null) {
        arr.unshift(square);
        square = square.prev;
    }
    let output = `=> You made it in ${arr.length - 1} moves! Here's your path:\n`;
    for (let i = 0; i < arr.length; i++) {
        // change each array index to be the position of the current square object
        arr[i] = new Array(arr[i].x, arr[i].y);
        // then add it to the output string
        output = `${output} [${arr[i]}]\n`;
    }
    return console.log(output);
};
  
const knightMoves = (origin, destination) => {
    // make board - 8 x 8
    const board = gameBoard(8);
    // initialize origin square -- origin[0] is x, origin[1] is y
    const originSquare = board.find(origin[0], origin[1]);
    // exit out if the origin square is off the game board
    if (!originSquare) {
        return console.log("No such starting square possible!");
    }
    // otherwise, continue initialization
    originSquare.visited = true;
    // set search iteration level to '0'
    originSquare.level = 0;
    // possible move combinations for x and y - linked at index values - moves clockwise
    const possibleX = [1, 2, 2, 1, -1, -2, -2, -1];
    const possibleY = [2, 1, -1, -2, -2, -1, 1, 2];
    // initialize looping variables
    let current;
    const queue = [originSquare];
    const searchMoves = [];
    // while there are squares in the queue
    while (queue.length > 0) {
        // get first queued square and remove it from queue
        current = queue.shift();
        // add to search moves array
        searchMoves.push(current);
        // if values match, return
        if (current.x === destination[0] && current.y === destination[1]) {
            return format(searchMoves);
        }
        
        // otherwise - eight possible moves can be made
        for (let i = 0; i < 8; i++) {
            // assigns values to possible move combinations at index
            const x = current.x + possibleX[i];
            const y = current.y + possibleY[i];
            // then checks them
            const found = board.find(x, y);
            if (found) {
                if (!found.visited) {
                    // initializes square and pushes to queue
                    found.visited = true;
                    found.level = current.level + 1;
                    found.prev = current;
                    queue.push(found);
                }
            }
        }
    }
};

console.log(knightMoves([0,0], [3,3]));