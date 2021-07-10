import './App.css';
import { Board } from './components/board/Board';
import './data_structure/SinglyLinkedList'

function App() {
  const BoardProps = {
    height: 12,
    width: 8,
    board: [

    ]
  }
  return (
    <div className="App">
      <Board {...BoardProps}></Board>
    </div>
  );
}

export default App;
