import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { DropzoneOptions } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import Avatar from "../../components/Avatar/Avatar";
import Dropzone from "../../components/Form/Dropzone";
import Error from "../../components/Form/Error";
import Input from "../../components/Form/Input";
import TextArea from "../../components/Form/TextArea";
import { deleteFile, uploadFile } from "../../firebaseFunctions";
import { useLogoutMutation } from "../auth/authApiSlice";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "./userApiSlice";

const NAME_MAX_LENGTH: number = 100;
const BIO_MAX_LENGTH: number = 80;

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(NAME_MAX_LENGTH, {
      message: `Name cannot be more than ${NAME_MAX_LENGTH} characters.`,
    }),
  bio: z
    .string()
    .max(BIO_MAX_LENGTH, {
      message: `Bio cannot be more than ${BIO_MAX_LENGTH} characters.`,
    })
    .optional(),
  image: z.instanceof(File).optional(),
});

type Form = z.infer<typeof schema>;

interface Props {
  handleModalClose: () => void;
}

const EditUser: React.FC<Props> = ({ handleModalClose }) => {
  const { id } = useParams();
  const { data: user, isSuccess } = useGetUserQuery(id);
  const [logout] = useLogoutMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    resetField,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Form>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const dropzoneOptions: DropzoneOptions = {
    accept: {
      "image/*": [".jpg", ".png"],
    },
    multiple: false,
    onDrop: onDrop,
  };

  function onDrop(files: File[]) {
    const image = files[0];
    setValue("image", image);
    setImageFile(image);
  }

  useEffect(() => {
    if (isSuccess) {
      const { name, bio } = user;

      reset({
        name,
        bio,
      });
    }
  }, [user, isSuccess, reset]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleDelete = async () => {
    try {
      await deleteUser(id).unwrap();
      await logout();
      handleModalClose();
      navigate("/");
    } catch (error) {
      toast.error("Could not delete account.");
    }
  };

  const handleUpdate: SubmitHandler<Form> = async (data) => {
    if (!id) return;

    const { name, bio, image } = data;

    let imageUrl;
    setIsLoading(true);

    try {
      if (image) {
        imageUrl = (await uploadFile(image, "images/")) as string;

        if (user?.image) {
          await deleteFile(user.image);
        }
      }

      await updateUser({ id, inputs: { name, bio, image: imageUrl } }).unwrap();
      handleModalClose();
    } catch (error) {
      toast.error("Could not update user.");
    } finally {
      setIsLoading(false);
    }
  };

  // create the preview
  useEffect(() => {
    if (!imageFile) return;
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  function removeImageButtonOnClick() {
    setImagePreview(undefined);
    resetField("image");
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleUpdate)}>
      <Input
        id="name"
        label="Name"
        {...register("name")}
        error={errors.name}
        maxLength={NAME_MAX_LENGTH}
        defaultValue={getValues("name")}
        required
      />

      <TextArea
        id="bio"
        label="Bio"
        {...register("bio")}
        error={errors.bio}
        maxLength={BIO_MAX_LENGTH}
        defaultValue={getValues("bio")}
      />

      <div>
        <label className="flex cursor-pointer flex-col gap-6" htmlFor="image">
          <span>Image</span>
          {(imagePreview || user?.image) && (
            <div className="max-w-fit self-center">
              <Avatar
                src={imagePreview || user?.image}
                alt={user?.name}
                size="xl"
              />
            </div>
          )}
        </label>

        <div className="mt-4 flex flex-col gap-2">
          {imagePreview ? (
            <button
              type="button"
              className="btn"
              onClick={removeImageButtonOnClick}
            >
              remove
            </button>
          ) : (
            <Dropzone
              id="image"
              dropzoneOptions={dropzoneOptions}
              {...register("image")}
            />
          )}

          {errors.image && <Error>{errors.image.message}</Error>}
        </div>
      </div>

      <div className="mt-5 flex w-full justify-between">
        <button
          className="btn-outline btn-error btn"
          type="button"
          onClick={handleDelete}
        >
          delete account
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={clsx("btn-primary btn", { loading: isLoading })}
        >
          {isLoading ? "updating" : "update"}
        </button>
      </div>
    </form>
  );
};

export default EditUser;
