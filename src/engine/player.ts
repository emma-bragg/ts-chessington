enum Player {
    WHITE,
    BLACK
}

export default Player;

export function getOppositePlayer(player: Player) {
    return (player == Player.WHITE ? Player.BLACK : Player.WHITE)
}
