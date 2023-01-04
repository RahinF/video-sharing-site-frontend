import clsx from "clsx";
import { Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadFile, uploadFileBase64 } from "../../firebaseFunctions";
import { selectCurrentUserId } from "../user/userSlice";
import { generateVideoThumbnails, getVideoDuration } from "./generateThumbnail";
import { useUploadVideoMutation } from "./videoApiSlice";

const Upload: React.FC = () => {
  const currentUserId = useSelector(selectCurrentUserId);
  const [uploadVideo] = useUploadVideoMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState<
    string | undefined
  >(undefined);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [duration, setDuration] = useState<number>(0);

  const [thumbnailsPreview, setThumbnailsPreview] = useState<string[]>([]);

  const [videoPreview, setVideoPreview] = useState<string | undefined>(
    undefined
  );

  const handleUpload = async () => {
    if (!currentUserId) return;

    let imageUrl, videoUrl;

    setIsLoading(true);

    try {
      if (selectedThumbnail) {
        imageUrl = (await uploadFileBase64(
          selectedThumbnail,
          "images/"
        )) as string;
      }

      if (videoFile) {
        videoUrl = (await uploadFile(videoFile, "videos/")) as string;
      }

      const video = await uploadVideo({
        title,
        description,
        duration,
        imageUrl,
        videoUrl,
        tags,
        userId: currentUserId,
      }).unwrap();

      toast.success("Video uploaded successfully.");
      navigate(`/video/${video._id}`);
    } catch (error) {
      toast.error("Could not upload video.");
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = () => {
    setTags((prev) => [...prev, tag.toLowerCase()]);
    setTag("");
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    const file = files[0];

    if (!file) return setVideoFile(null);

    // removes file name extension
    const fileName = file.name.substring(0, file.name.lastIndexOf("."));

    if (!title) {
      setTitle(fileName);
    }

    setVideoFile(file);
  };

  // create the video preview
  useEffect(() => {
    if (!videoFile) {
      return setVideoPreview(undefined);
    }
    const objectUrl = URL.createObjectURL(videoFile);
    setVideoPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [videoFile]);

  useEffect(() => {
    if (!videoFile) {
      setThumbnailsPreview([]);
      setSelectedThumbnail(undefined);
      return;
    }

    const getDuration = async () => {
      const duration = (await getVideoDuration(videoFile)) as number;
      setDuration(duration);
    };

    const generateThumbnails = async () => {
      const numberOfThumbnails = 5;
      const thumbnails = await generateVideoThumbnails(
        videoFile,
        numberOfThumbnails
      );
      setThumbnailsPreview(thumbnails as string[]);
    };

    getDuration();
    generateThumbnails();
  }, [videoFile]);

  useEffect(() => {
    if (thumbnailsPreview) {
      setSelectedThumbnail(thumbnailsPreview[0]);
    }
  }, [thumbnailsPreview]);

  const titleMaxLength = 100;
  const descriptionMaxLength = 250;

  const titleIsTooLong = title.length > titleMaxLength;
  const descriptionIsTooLong = description.length > descriptionMaxLength;

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-base-200 p-5">
      <div className="mt-6">
        <h1 className="text-xl font-medium">Upload Video</h1>
        <p>Post a video to your account</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4 lg:order-1">
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

        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="video" className="label">
              Video
            </label>
            <input
              className="input-file input"
              id="video"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
            />
          </div>
          <video
            src={videoPreview}
            controls
            className={clsx("rounded-lg", { hidden: !videoPreview })}
          />

          {thumbnailsPreview.length > 0 && (
            <div>
              <div className="my-2">Thumbnail</div>
              <div className="flex gap-2 overflow-auto pb-2">
                {thumbnailsPreview.map((thumbnail, index) => (
                  <img
                    key={index}
                    src={thumbnail}
                    className={clsx("h-28 cursor-pointer rounded-lg", {
                      [thumbnail === selectedThumbnail
                        ? "opacity-100"
                        : "opacity-50"]: true,
                    })}
                    onClick={() => setSelectedThumbnail(thumbnail)}
                    alt={`thumbnail preview ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          className={clsx("btn-primary btn", { loading: isLoading })}
          onClick={handleUpload}
          disabled={
            !title ||
            titleIsTooLong ||
            !selectedThumbnail ||
            descriptionIsTooLong ||
            !videoFile ||
            isLoading
          }
        >
          {isLoading ? "uploading" : "upload"}
        </button>
      </div>
    </div>
  );
};

export default Upload;
