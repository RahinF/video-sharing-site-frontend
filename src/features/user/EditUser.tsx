import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { deleteFile, uploadFile } from "../../firebaseFunctions";
import { useLogoutMutation } from "../auth/authApiSlice";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "./userApiSlice";

interface Props {
  handleModalClose: () => void;
}

const EditUser: React.FC<Props> = ({ handleModalClose }) => {
  const { id } = useParams();
  const { data: user, isSuccess } = useGetUserQuery(id);
  const [logout] = useLogoutMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const nameMaxLength = 30;
  const nameIsTooLong = name?.length > nameMaxLength;

  const bioMaxLength = 80;
  const bioIsTooLong = bio?.length > bioMaxLength;

  useEffect(() => {
    if (isSuccess) {
      setName(user.name);
      setBio(user.bio);
    }
  }, [user, isSuccess]);

  const handleDelete = async () => {
    try {
      await deleteUser(id).unwrap();
      await logout();
    } catch (error) {
      console.log("failed to delete account");
    }
  };

  const handleUpdate = async () => {
    let imageUrl;
    setIsLoading(true);

    try {
      if (imageFile) {
        imageUrl = (await uploadFile(imageFile, "images/")) as string;

        if (user?.image) {
          await deleteFile(user.image);
        }
      }

      await updateUser({ id, inputs: { name, bio, image: imageUrl } }).unwrap();
      handleModalClose();
    } catch (error) {
      console.log("could not update user");
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let target = event.target as HTMLInputElement;
    let files = target.files as FileList;

    setImageFile(files[0]);
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="label self-center" htmlFor="image">
        <Avatar src={imagePreview || user?.image} alt={user?.name} size="xl" />
      </label>

      <input
        type="file"
        id="image"
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />
      <div>
        <div className="flex items-center justify-between">
          <label className="label" htmlFor="name">
            Name
          </label>
          <span
            className={clsx({
              "text-xs": true,
              "text-error": nameIsTooLong,
            })}
          >
            {name?.length || 0}/{nameMaxLength}
          </span>
        </div>
        <input
          id="name"
          className={clsx({
            input: true,
            "input-error": nameIsTooLong,
          })}
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="label" htmlFor="bio">
            Bio
          </label>
          <span
            className={clsx({
              "text-xs": true,
              "text-error": bioIsTooLong,
            })}
          >
            {bio?.length || 0}/{bioMaxLength}
          </span>
        </div>
        <textarea
          id="bio"
          className={clsx("textarea", { "textarea-error": bioIsTooLong })}
          rows={4}
          onChange={(event) => setBio(event.target.value)}
          value={bio}
        />
      </div>

      <div className="mt-5 flex w-full justify-between">
        <button className="btn-outline btn-error btn" onClick={handleDelete}>
          delete account
        </button>
        <button
          onClick={handleUpdate}
          disabled={!name || nameIsTooLong || bioIsTooLong || isLoading}
          className={clsx("btn-primary btn", { loading: isLoading })}
        >
          {isLoading ? "updating" : "update"}
        </button>
      </div>
    </div>
  );
};

export default EditUser;
