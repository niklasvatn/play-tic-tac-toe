import { useState, useEffect } from "react";
import { Container, Text, VStack, Box, Button, Grid, ScaleFade } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);

  useEffect(() => {
    console.log("Board state:", board);
    console.log("Winner:", winner);
  }, [board, winner]);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = calculateWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningSquares(result.winningSquares);
    } else if (!newBoard.includes(null)) {
      setWinner("Draw");
    }
  };

  const renderSquare = (index) => (
    <Button
      as={motion.button}
      whileHover={{ scale: 1.1 }}
      height="200px"
      width="100px"
      fontSize="2xl"
      onClick={() => handleClick(index)}
      color={board[index] === "X" ? "red.500" : board[index] === "O" ? "blue.500" : "black"}
      bg={winningSquares.includes(index) ? "yellow.200" : "white"}
    >
      {board[index]}
    </Button>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningSquares([]);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Tic Tac Toe</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={1}>
          {board.map((_, index) => (
            <Box key={index}>{renderSquare(index)}</Box>
          ))}
        </Grid>
        {winner && (
          <ScaleFade initialScale={0.9} in={true}>
            <Text fontSize="xl" color={winner === "Draw" ? "orange.500" : "green.500"}>
              {winner === "Draw" ? "It's a draw!" : `Winner: ${winner}`}
            </Text>
          </ScaleFade>
        )}
        <Button onClick={resetGame} mt={4}>
          Reset Game
        </Button>
      </VStack>
    </Container>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: lines[i] };
    }
  }

  return { winner: null, winningSquares: [] };
};

export default Index;
