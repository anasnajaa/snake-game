let snake = {};
snake = {
    NORTH: { x: 0, y: -1 },
    SOUTH: { x: 0, y:  1 },
    EAST:  { x: 1, y:  0 },
    WEST:  { x:-1, y:  0 },

    pointEq: p1 => p2 => p1.x === p2.x && p1.y === p2.y,

    willEat:   state => pointEq(nextHead(state))(state.apple),
    willCrash: state => state.snake.find(pointEq(nextHead(state))),
    validMove: move => state => 
    state.moves[0].x + move.x !== 0 || 
    state.moves[0].y + move.y !== 0,

    nextMoves: state => state.moves.length > 1 ? dropFirst(state.moves) : state.moves,
    nextApple: state => willEat(state) ? rndPos(state) : state.apple,
    nextHead:  state => state.snake.length === 0 ? { x: 2, y: 2 } : {
        x: mod(state.cols)(state.snake[0].x + state.moves[0].x),
        y: mod(state.rows)(state.snake[0].y + state.moves[0].y)
    },
    nextSnake: state => willCrash(state) 
    ? [] 
    : (willEat(state)) 
        ? [nextHead(state)].concat(state.snake) 
        : [nextHead(state)].concat(dropLast(state.snake)),
    rndPos: table => ({
        x: rnd(0)(table.cols - 1),
        y: rnd(0)(table.rows - 1),
    }),
    initialState: () => ({
        cols: 20,
        rows: 20,
        moves: [snake.EAST],
        snake: [],
        apple: { x: 16, y: 2 }
    }),
    next: spec({
        rows: prop('rows'),
        cols: prop('cols'),
        moves: snake.nextMoves,
        snake: snake.nextSnake,
        apple: snake.nextApple
    }),
    enqueue: (state, move) => validMove(move)(state)
    ? merge(state)({moves: state.moves.concat([move])})
    : state,

};