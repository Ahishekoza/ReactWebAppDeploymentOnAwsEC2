import NestedComments from "./components/NestedComments";
import {commentsData} from "./data/comments"

function App() {
  return (
    <>
      <div>
        <h1>Nested Comments System</h1>
        <NestedComments
          comments={commentsData}
          onSubmit={() => {}}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      </div>
    </>
  );
}

export default App;
