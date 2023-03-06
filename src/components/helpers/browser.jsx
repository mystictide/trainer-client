import ExerciseBoxes from "../main/exerciseBoxes";

function Browser({ data }) {
  return <>{data ? <ExerciseBoxes data={data} isCMS={false} /> : ""}</>;
}

export default Browser;
