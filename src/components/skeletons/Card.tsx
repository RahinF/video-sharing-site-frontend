const Card = () => {
  return (
    <div className="animate-pulse grid grid-cols-2 gap-2 sm:grid-cols-1">
      <div className="h-24 overflow-hidden rounded-lg bg-zinc-700 sm:h-40" />
      <div className="pt-2">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-full rounded-lg bg-zinc-700" />
          <div className="h-4 w-1/2 rounded-lg bg-zinc-700" />
        </div>
      </div>
    </div>
  );
};

export default Card;
