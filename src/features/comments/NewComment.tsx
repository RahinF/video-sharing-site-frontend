import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useAppSelector } from "../../app/hooks";
import TextArea from "../../components/Form/TextArea";
import { selectCurrentUserId } from "../user/userSlice";
import { usePostCommentMutation } from "./commentsApiSlice";

interface Props {
  videoId: string | undefined;
}

const COMMENT_MAX_LENGTH: number = 250;

const schema = z.object({
  comment: z
    .string()
    .min(1, { message: "Comment cannnot be empty." })
    .max(COMMENT_MAX_LENGTH, {
      message: `Comment cannot be more than ${COMMENT_MAX_LENGTH} characters.`,
    }),
});

type Form = z.infer<typeof schema>;

const NewComment: FC<Props> = ({ videoId }) => {
  const [postComment] = usePostCommentMutation();
  const currentUserId = useAppSelector(selectCurrentUserId);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Form>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      await postComment({
        userId: currentUserId,
        videoId,
        description: data.comment,
      }).unwrap();

      toast.success("Comment posted.");
    } catch (error) {
      toast.error("Could not post comment.");
    }
  };

  const handleRemoveFocus = useCallback(() => {
    setIsFocused(false);
    resetField("comment");
  }, [resetField]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      handleRemoveFocus();
    }
  }, [isSubmitSuccessful, handleRemoveFocus]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg bg-primary-dark px-4 py-6"
    >
      <TextArea
        id="comment"
        label="Add comment"
        rows={isFocused ? 4 : 1}
        {...register("comment")}
        error={errors.comment}
        maxLength={COMMENT_MAX_LENGTH}
        onFocus={() => setIsFocused(true)}
      />

      {isFocused && (
        <div className="mt-4 flex justify-between">
          <div className="flex gap-4">
            <button
              className="btn-outline btn btn-primary"
              onClick={handleRemoveFocus}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              type="submit"
            >
              Comment
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default NewComment;
