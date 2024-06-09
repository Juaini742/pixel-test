function Loader({
  text,
  h,
  w,
}: {
  text?: string;
  h?: number | string;
  w?: number | string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`text-primary-3 inline-block h-${h} w-${w} animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      />
      <span>{text}</span>
    </div>
  );
}

export default Loader;
