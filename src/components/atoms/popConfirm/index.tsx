interface Props {
  left?: number;
  right?: number;
}

function PopConfirm({ left, right }: Props) {
  return (
    <div
      className={`absolute z-10 left-${left} right-${right} w-28 py-1 border shadow-md rounded bg-white top-10 flex flex-col`}
    >
      <button className="border-b text-primary-1 pl-2 text-left">Edit</button>
      <button className="text-indicator-3 pl-2 text-left mt-1">Delete</button>
    </div>
  );
}

export default PopConfirm;
