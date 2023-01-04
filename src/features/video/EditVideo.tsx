import clsx from "clsx";
import { Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { deleteFile } from "../../firebaseFunctions";
import {
  useDeleteVideoMutation,
  useGetVideoQuery,
  useUpdateVideoMutation,
} from "./videoApiSlice";

interface Props {
  handleModalClose: () => void;
}

const EditVideo: React.FC<Props> = ({ handleModalClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: video, isSuccess } = useGetVideoQuery(id);

  const [updateVideo] = useUpdateVideoMutation();
  const [deleteVideo] = useDeleteVideoMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setTitle(video.title);
      setDescription(video.description);
      setTags(video.tags);
    }
  }, [video, isSuccess]);

  const handleUpdate = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      await updateVideo({
        id,
        inputs: { title, description, tags },
      }).unwrap();
      toast.success("Video updated.");
      handleModalClose();
    } catch (error) {
      toast.error("Could not update video.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteFile(video!.videoUrl);
      await deleteVideo(id).unwrap();
      toast.success("Video deleted.");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Could not delete video.");
    }
  };

  const addTag = () => {
    setTags((prev) => [...prev, tag.toLowerCase()]);
    setTag("");
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const titleMaxLength = 100;
  const descriptionMaxLength = 250;

  const titleIsTooLong = title.length > titleMaxLength;
  const descriptionIsTooLong = description.length > descriptionMaxLength;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="title" className="label">
              Title
            </label>

            <span
              className={clsx({
                "text-xs": true,
                "text-error": titleIsTooLong,
              })}
            >
              {title.length}/{titleMaxLength}
            </span>
          </div>
          <input
            id="title"
            className={clsx({
              input: true,
              "input-error": titleIsTooLong,
            })}
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="description" className="label">
              Description
            </label>
            <span
              className={clsx({
                "text-xs": true,
                "text-error": descriptionIsTooLong,
              })}
            >
              {description.length}/{descriptionMaxLength}
            </span>
          </div>
          <textarea
            id="description"
            className={clsx({
              textarea: true,
              "textarea-error": descriptionIsTooLong,
            })}
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            rows={4}
          />
        </div>

        <div>
          <label className="label" htmlFor="tags">
            Tags
          </label>
          <div className="flex">
            <input
              id="tags"
              className="input pr-14"
              placeholder="Add a tag..."
              value={tag}
              onChange={(event) => setTag(event.target.value)}
            />
            <button
              className="btn-primary btn-square btn -ml-12 rounded-tl-none rounded-bl-none"
              onClick={addTag}
              disabled={!tag}
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <button
              key={index}
              onClick={() => removeTag(index)}
              className="btn-sm btn"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button className="btn-outline btn-error btn" onClick={handleDelete}>
          Delete
        </button>

        <button
          onClick={handleUpdate}
          disabled={
            !title || titleIsTooLong || descriptionIsTooLong || isLoading
          }
          className={clsx("btn-primary btn", { loading: isLoading })}
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default EditVideo;
