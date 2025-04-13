export default function Die(props) {
  return (
    <button
      className={
        (props.isHeld ? "bg-pastel-green" : null) +
        " bg-white text-charade fs-800 fw-bold"
      }
      onClick={props.toggleHold}
      aria-pressed={props.isHeld ? true : false}
      aria-label={`Die with value ${props.value}, ${
        props.isHeld ? "held" : "not held"
      }`}
    >
      {props.value}
    </button>
  );
}
