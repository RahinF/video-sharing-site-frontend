import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import Input from '../../components/Form/Input';
import TextArea from '../../components/Form/TextArea';
import { deleteFile } from '../../firebaseFunctions';
import Tags from './Tags';
import {
  useDeleteVideoMutation,
  useGetVideoQuery,
  useUpdateVideoMutation,
} from './videoApiSlice';

const TITLE_MAX_LENGTH: number = 100;
const DESCRIPTION_MAX_LENGTH: number = 250;

const schema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(TITLE_MAX_LENGTH, {
      message: `Title cannot be more than ${TITLE_MAX_LENGTH} characters.`,
    }),
  description: z
    .string()
    .min(1, { message: 'Description is required.' })
    .max(DESCRIPTION_MAX_LENGTH, {
      message: `Description cannot be more than ${DESCRIPTION_MAX_LENGTH} characters.`,
    }),
  tags: z
    .object({
      name: z.string().min(1, { message: 'Tag must not be empty.' }),
    })
    .array(),
});

type Form = z.infer<typeof schema>;

interface Props {
  handleModalClose: () => void;
}

const EditVideo: React.FC<Props> = ({ handleModalClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Form>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  });

  const { data: video, isSuccess } = useGetVideoQuery(id);

  const [updateVideo] = useUpdateVideoMutation();
  const [deleteVideo] = useDeleteVideoMutation();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (video) {
      const tags = video.tags.map((tag) => ({ name: tag }));

      reset({
        title: video.title,
        description: video.description,
        tags: tags,
      });
    }
  }, [video, isSuccess, reset]);

  const onSubmit: SubmitHandler<Form> = async (data) => {
    if (!id) return;

    const tags = data.tags?.map((tag) => tag.name.toLowerCase()).sort();

    setIsLoading(true);
    try {
      await updateVideo({
        id,
        inputs: {
          title: data.title,
          description: data.description,
          tags,
        },
      }).unwrap();
      toast.success('Video updated.');
      handleModalClose();
    } catch (error) {
      toast.error('Could not update video.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteFile(video!.videoUrl);
      await deleteVideo(id).unwrap();
      toast.success('Video deleted.');
      navigate('/', { replace: true });
    } catch (error) {
      toast.error('Could not delete video.');
    }
  };

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-6">
        <Input
          id="title"
          label="Title"
          {...register('title')}
          error={errors.title}
          maxLength={TITLE_MAX_LENGTH}
          defaultValue={video?.title}
          required
        />

        <TextArea
          id="description"
          label="Description"
          {...register('description')}
          error={errors.description}
          maxLength={DESCRIPTION_MAX_LENGTH}
          defaultValue={video?.description}
          rows={4}
          required
        />

        <Tags
          control={control}
          register={register}
          error={errors.tags}
        />
      </div>

      <div className="mt-8 flex justify-between">
        <button
          className="btn-outline btn btn-error"
          onClick={handleDelete}
          type="button"
          aria-label="delete video"
        >
          Delete
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className={clsx('btn btn-primary', { loading: isLoading })}
          aria-label="update video details"
        >
          {isLoading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </form>
  );
};

export default EditVideo;
