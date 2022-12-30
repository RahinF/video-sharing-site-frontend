const Comment = () => {
  return (
    <div className="flex animate-pulse gap-3">
      <div className="h-16 w-16 flex-none rounded-full bg-slate-200"></div>

      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="h-4 w-1/4 rounded-lg bg-slate-200"></div>
          <div className="h-4 w-1/6 rounded-lg bg-slate-200"></div>
        </div>

        <div className="h-4 w-full rounded-lg bg-slate-200"></div>
        <div className="h-4 w-1/2 rounded-lg bg-slate-200"></div>

        <div className="flex gap-2">
          <div className="h-8 w-8 rounded-full bg-slate-200"></div>
          <div className="h-8 w-8 rounded-full bg-slate-200"></div>
          <div className="h-8 w-8 rounded-full bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

export default Comment;