import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { MagnifyingGlass } from "phosphor-react";
import { FC, FocusEvent, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  query: z.string().min(1, { message: "Query cannot be empty." }),
});

type Form = z.infer<typeof schema>;

const SearchBar: FC = () => {
  const navigate = useNavigate();
  const [focus, setFocus] = useState(false);
  const searchBarRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Form>({ mode: "onBlur", resolver: zodResolver(schema) });

  const { ref, ...rest } = register("query");

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const params = new URLSearchParams({ q: data.query });
    navigate(`/search?${params}`);
  };

  const handleOpenSearch = () => {
    setFocus(true);
  };

  const handleOnBlur = (event: FocusEvent<HTMLFormElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setFocus(false);
    }
  };

  useEffect(() => {
    searchBarRef.current?.focus();
  }, [focus]);

  const searchBarNotActive = (
    <span
      className="tooltip tooltip-bottom hover:tooltip-open"
      data-tip="Search"
    >
      <button
        className="btn-ghost btn-circle btn"
        aria-label="open search"
        onClick={handleOpenSearch}
      >
        <MagnifyingGlass size={24} />
      </button>
    </span>
  );

  const searchBarActive = (
    <div className="flex">
      <input
        aria-label="search bar"
        className={clsx("input pr-14", {
          "border-error focus:border-error focus:ring-error": errors.query,
        })}
        placeholder="Search"
        {...rest}
        ref={(event) => {
          ref(event);
          searchBarRef.current = event;
        }}
      />

      <button
        className="btn-primary btn-square btn -ml-12 rounded-tl-none rounded-bl-none"
        aria-label="search"
      >
        <MagnifyingGlass size={24} />
      </button>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx({
        "absolute left-0 z-50 w-full px-2": focus,
      })}
      onBlur={handleOnBlur}
    >
      {focus ? searchBarActive : searchBarNotActive}
    </form>
  );
};

export default SearchBar;
