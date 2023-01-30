import { FC, useEffect, useState } from "react";
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import Error from "../../components/Form/Error";

interface Tag {
  name: string;
}

interface Props {
  control: Control<any, any>;
  register: UseFormRegister<any>;
  error:
    | Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<Tag>> | undefined)[]>
    | undefined;
}

const Tags: FC<Props> = ({ control, register, error }) => {
  const MAX_TAGS: number = 10;
  const [tagCount, setTagCount] = useState<number>(0);
  const tagLimitReached: boolean = MAX_TAGS === tagCount;

  const { fields, append, remove } = useFieldArray({
    name: "tags",
    control,
  });

  function addTag() {
    append({
      name: "",
    });
    setTagCount((count) => count + 1);
  }

  function removeTag(index: number) {
    remove(index);
    setTagCount((count) => count - 1);
  }

  useEffect(() => {
    setTagCount(fields.length);
  }, [fields]);

  return (
    <div className="flex flex-col gap-2">
      <span className="flex justify-between">
        <span>Tags</span>
        <span className="text-sm" aria-hidden="true">
          {tagCount} / {MAX_TAGS}
        </span>
      </span>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => addTag()}
        disabled={tagLimitReached}
        aria-label="add tag field"
      >
        add
      </button>

      <div className="mt-2 grid gap-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <div className="flex gap-2">
                <input
                  className="input bg-primary"
                  {...register(`tags.${index}.name` as const)}
                />
                <button
                  type="button"
                  className="btn"
                  onClick={() => removeTag(index)}
                  aria-label="delete tag field"
                >
                  delete
                </button>
              </div>
              {error && error[index] && (
                <Error>{error[index]?.name?.message}</Error>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tags;
