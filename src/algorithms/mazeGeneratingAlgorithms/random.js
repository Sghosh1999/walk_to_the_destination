import Position, { isEqual, getNeighbours } from "../../helper/position";

const walls = [];

const isOnEdge = (position, rows, columns) => {
    return (
        position.x === 1 ||
        position.x === rows ||
        position.y === 1 ||
        position.y === columns
    );
};

const generateRandomWalls = (rows, columns) => {
    for (let i = 3; i < rows - 1; i++) {
        for (let j = 3; j < columns - 1; j++) {
            if (Math.random() >= 0.7) walls.push(new Position(i, j));
        }
    }
};

const generateRandomMaze = (rows, columns, source, target) => {
    for (let i = 1; i <= rows; i++) {
        walls.push(new Position(i, 1));
        walls.push(new Position(i, columns));
    }

    for (let j = 2; j < columns; j++) {
        walls.push(new Position(1, j));
        walls.push(new Position(rows, j));
    }

    generateRandomWalls(rows, columns);

    const sourceNeighbours = isOnEdge(source)
        ? getNeighbours(source, rows, columns)
        : [];
    const targetNeighbours = isOnEdge(target)
        ? getNeighbours(target, rows, columns)
        : [];
    return walls.filter(
        (wall) =>
            !isEqual(wall, source) &&
            !isEqual(wall, target) &&
            (wall.y !== columns - 1 || wall.x === 1 || wall.x === rows) &&
            !sourceNeighbours.some((node) => isEqual(node, wall)) &&
            !targetNeighbours.some((node) => isEqual(node, wall))
    );
};

export default generateRandomMaze;
