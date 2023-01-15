import clsx from "clsx";
import { FC, forwardRef } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  dropzoneOptions: DropzoneOptions;
}

const Dropzone: FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ id, dropzoneOptions, ...props }, ref) => {
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
    } = useDropzone(dropzoneOptions);

    return (
      <div
        {...getRootProps()}
        className={clsx(
          "grid h-60 w-full cursor-pointer place-items-center border border-dashed",
          {
            "border-white": !isDragActive,
            "border-green-400": isDragAccept,
            "border-red-400": isDragReject,
          }
        )}
      >
        <input id={id} type="file" ref={ref} {...props} {...getInputProps()} />
        <p>Drag 'n' drop file here, or click to select file.</p>
      </div>
    );
  }
);

export default Dropzone;
