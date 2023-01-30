import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { DropzoneOptions } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAppSelector } from "../../../app/hooks";
import Dropzone from "../../../components/Form/Dropzone";
import Error from "../../../components/Form/Error";
import Input from "../../../components/Form/Input";
import TextArea from "../../../components/Form/TextArea";
import { uploadFile, uploadFileBase64 } from "../../../firebaseFunctions";
import trimFileExtFromName from "../../../util/trimFileExtFromName";
import { selectCurrentUserId } from "../../user/userSlice";
import Tags from "../Tags";
import { useUploadVideoMutation } from "../videoApiSlice";
import { generateVideoThumbnails, getVideoDuration } from "./generateThumbnail";
import Thumbnails from "./Thumbnails";

const TITLE_MAX_LENGTH: number = 100;
const DESCRIPTION_MAX_LENGTH: number = 250;

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(TITLE_MAX_LENGTH, {
      message: `Title cannot be more than ${TITLE_MAX_LENGTH} characters.`,
    }),
  description: z
    .string()
    .min(1, { message: "Description is required." })
    .max(DESCRIPTION_MAX_LENGTH, {
      message: `Description cannot be more than ${DESCRIPTION_MAX_LENGTH} characters.`,
    }),
  tags: z
    .object({
      name: z.string().min(1, { message: "Tag must not be empty." }),
    })
    .array(),
  thumbnail: z.string({
    required_error: "Please select a thumbnail.",
    invalid_type_error: "Please select a thumbnail.",
  }),
  video: z.instanceof(File, { message: "Video file is required." }),
});

export type Form = z.infer<typeof schema>;

export type ThumbnailStatus = "initial" | "loading" | "set";

const Upload: FC = () => {
  const currentUserId = useAppSelector(selectCurrentUserId);
  const [uploadVideo] = useUploadVideoMutation();
  const navigate = useNavigate();

  const [selectedThumbnail, setSelectedThumbnail] = useState<
    string | undefined
  >(undefined);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [duration, setDuration] = useState<number>(0);

  const [thumbnailsPreview, setThumbnailsPreview] = useState<string[]>([]);

  const [thumbnailStatus, setThumbnailStatus] =
    useState<ThumbnailStatus>("initial");

  const [videoPreview, setVideoPreview] = useState<string | undefined>(
    undefined
  );

  const {
    register,
    handleSubmit,
    resetField,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Form>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const dropzoneOptions: DropzoneOptions = {
    accept: {
      "video/mp4": [".mp4"],
    },
    multiple: false,
    onDrop: onDrop,
  };

  function onDrop(files: File[]) {
    const video = files[0];
    setValue("video", video);
    setVideoFile(video);
    setValue("title", trimFileExtFromName(video.name));
  }

  const onSubmit: SubmitHandler<Form> = async (data) => {
    if (!currentUserId) return;

    const { title, description, thumbnail, video } = data;

    const tags = data.tags.map((tag) => tag.name.toLowerCase()).sort();

    setIsLoading(true);

    try {
      const imageUrl = (await uploadFileBase64(thumbnail, "images/")) as string;

      const videoUrl = (await uploadFile(video, "videos/")) as string;

      const uploadedVideo = await uploadVideo({
        title,
        description,
        duration,
        imageUrl,
        videoUrl,
        tags,
        userId: currentUserId,
      }).unwrap();

      toast.success("Video uploaded successfully.");
      navigate(`/video/${uploadedVideo._id}`);
    } catch (error) {
      toast.error("Could not upload video.");
    } finally {
      setIsLoading(false);
    }
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

    const generateThumbnails = async (numberOfThumbnails: number) => {
      const thumbnails = await generateVideoThumbnails(
        videoFile,
        numberOfThumbnails
      );

      const uniqueThumbnails = (thumbnails as string[]).filter(
        (item, position, self) => self.indexOf(item) === position
      );

      return uniqueThumbnails;
    };

    (async () => {
      setThumbnailStatus("loading");
      const duration = await getVideoDuration(videoFile);
      const thumbnails = await generateThumbnails(10);
      setDuration(duration as number);
      setThumbnailsPreview(thumbnails);
      setThumbnailStatus("set");
    })();
  }, [videoFile]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      resetVideoAndThumbnail();
    }
  }, [isSubmitSuccessful, reset]);

  function removeVideoButtonOnClick() {
    resetField("video");
    resetField("thumbnail");
    resetVideoAndThumbnail();
  }

  function resetVideoAndThumbnail() {
    setVideoPreview(undefined);
    setThumbnailStatus("initial");
    setThumbnailsPreview([]);
    setSelectedThumbnail(undefined);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 rounded-xl bg-primary-dark p-5"
    >
      <div className="mt-6 mb-10">
        <h1 className="text-xl font-medium">Upload Video</h1>
        <p>Post a video to your account</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex basis-1/2 flex-col gap-4 lg:order-1">
          <Input
            id="title"
            label="Title"
            {...register("title")}
            error={errors.title}
            maxLength={TITLE_MAX_LENGTH}
            defaultValue={getValues("title")}
            required
          />

          <TextArea
            id="description"
            label="Description"
            {...register("description")}
            error={errors.description}
            maxLength={DESCRIPTION_MAX_LENGTH}
            rows={4}
            required
          />

          <Tags control={control} register={register} error={errors.tags} />
        </div>

        <div className="flex max-w-xl basis-1/2 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="video">
              Video{" "}
              <span aria-hidden className="text-error">
                *
              </span>
            </label>

            {errors.video && <Error>{errors.video.message}</Error>}

            {videoPreview ? (
              <>
                <video src={videoPreview} controls className="rounded-lg" />
                <button
                  type="button"
                  className="btn"
                  onClick={removeVideoButtonOnClick}
                >
                  remove
                </button>
              </>
            ) : (
              <Dropzone
                id="video"
                dropzoneOptions={dropzoneOptions}
                {...register("video")}
              />
            )}
          </div>

          <Thumbnails
            register={register}
            error={errors.thumbnail}
            setValue={setValue}
            thumbnailStatus={thumbnailStatus}
            thumbnailsPreview={thumbnailsPreview}
            selectedThumbnail={selectedThumbnail}
            setSelectedThumbnail={setSelectedThumbnail}
          />
        </div>
      </div>

      <div className="mt-20 flex items-baseline justify-between gap-2">
        <div aria-hidden>
          Fields marked with <span className="text-error">*</span> are required.
        </div>
        <button
          type="submit"
          className={clsx("btn btn-primary", { loading: isLoading })}
          disabled={isLoading}
        >
          {isLoading ? "uploading" : "upload"}
        </button>
      </div>
    </form>
  );
};

export default Upload;
