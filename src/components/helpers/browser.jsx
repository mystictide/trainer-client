import ExerciseBoxes from "../main/exerciseBoxes";

function Browser({ data }) {
  return (
    <>
      <div className="h-items form-gap c-gap-10">
        <div className="h-items single c-gap-10 r-gap-10">
          {data ? (
            <>
              <ExerciseBoxes data={data} isCMS={false} />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Browser;
