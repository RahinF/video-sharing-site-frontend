import clsx from "clsx";
import { Dispatch, FC, KeyboardEvent, SetStateAction } from "react";
import { FieldError, UseFormRegister, UseFormSetValue } from "react-hook-form";
import ScrollContainer from "react-indiana-drag-scroll";
import { Form, ThumbnailStatus } from ".";
import Error from "../../../components/Form/Error";
import Spinner from "../../../components/Spinner";

interface Props {
  error: FieldError | undefined;
  setValue: UseFormSetValue<Form>;
  setSelectedThumbnail: Dispatch<SetStateAction<string | undefined>>;
  thumbnailStatus: ThumbnailStatus;
  thumbnailsPreview: string[];
  selectedThumbnail: string | undefined;
  register: UseFormRegister<Form>;
}

const Thumbnails: FC<Props> = ({
  register,
  error,
  setValue,
  setSelectedThumbnail,
  thumbnailStatus,
  thumbnailsPreview,
  selectedThumbnail,
}) => {
  function selectThumbnailOnKeyDown(
    event: KeyboardEvent<HTMLLabelElement>,
    thumbnail: string
  ) {
    const { code } = event;
    if (code === "Enter" || code === "Space") {
      event.preventDefault();
      setValue("thumbnail", thumbnail);
      setSelectedThumbnail(thumbnail);
    }
  }

  if (thumbnailStatus === "initial") return null;
  if (thumbnailStatus === "loading") return <Spinner />;

  return (
    <div>
      <span className="my-2">
        Thumbnail{" "}
        <span aria-hidden className="text-error">
          *
        </span>
      </span>

      {thumbnailStatus === "set" && (
        <ScrollContainer
          hideScrollbars={false}
          className="flex gap-2 overflow-auto p-2"
        >
          {thumbnailsPreview.map((thumbnail, index) => (
            <label
              key={index}
              className="cursor-pointer"
              tabIndex={0}
              onKeyDown={(event) => selectThumbnailOnKeyDown(event, thumbnail)}
            >
              <img
                width={160}
                height={90}
                src={thumbnail}
                className={clsx("aspect-video max-w-none rounded-lg", {
                  [thumbnail === selectedThumbnail
                    ? "opacity-100"
                    : "opacity-50"]: true,
                })}
                onClick={() => setSelectedThumbnail(thumbnail)}
                alt={`thumbnail preview ${index + 1}`}
              />
              <input
                type="radio"
                {...register("thumbnail")}
                value={thumbnail}
                hidden
              />
            </label>
          ))}
        </ScrollContainer>
      )}
      {error && <Error>{error.message}</Error>}
    </div>
  );
};

export default Thumbnails;
