const importFileandPreview = (file: File, revoke: null) => {
  return new Promise((resolve, _reject) => {
    window.URL = window.URL || window.webkitURL;
    const url = window.URL.createObjectURL(file);

    if (revoke) {
      window.URL.revokeObjectURL(url);
    }
    setTimeout(() => {
      resolve(url);
    }, 100);
  });
};

export const generateVideoThumbnails = async (
  file: File,
  numberOfThumbnails: number
) => {
  let thumbnails: string[] = [];
  let fractions: number[] = [];
  return new Promise(async (resolve, reject) => {
    if (!file.type?.includes("video")) reject("not a valid video file");
    try {
      const duration = (await getVideoDuration(file)) as number;
      for (let i = 0; i <= duration; i += duration / numberOfThumbnails) {
        fractions.push(Math.floor(i));
      }
      const promiseArray = fractions.map((time) => {
        return getVideoThumbnail(file, time);
      });
      try {
        const res = await Promise.all(promiseArray);
        res.forEach((thumbnail) => {
          thumbnails.push(thumbnail as string);
        });
        resolve(thumbnails);
      } catch (error) {
        console.error(error);
      } finally {
        resolve(thumbnails);
      }
    } catch {
      reject("something went wrong");
    }
  });
};

const getVideoThumbnail = (file: File, videoTimeInSeconds: number) => {
  return new Promise(async (resolve, reject) => {
    if (!file.type.match("video")) reject("file not valid");

    const url = (await importFileandPreview(file, null)) as string;
    const video = document.createElement("video");

    const snapImage = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")!
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL();
   
      const success = image.length > 100000;
      if (success) {
        URL.revokeObjectURL(url);
        resolve(image);
      }
      return success;
    };

    video.onloadeddata = () => {
      if (snapImage()) {
        video.ontimeupdate = null;
      }
    };

    video.ontimeupdate = () => {
      if (snapImage()) {
        video.ontimeupdate = null;
        video.pause();
      }
    };

    video.preload = "metadata";
    video.src = url;
    // Load video in Safari / IE11
    video.muted = true;
    video.playsInline = true;
    video.currentTime = videoTimeInSeconds;
    video.play();
  });
};

export const getVideoDuration = (file: File) => {
  return new Promise(async (resolve, reject) => {
    if (!file) reject("file not valid");
    if (file.type.match("video")) {
      try {
        const url = (await importFileandPreview(file, null)) as string;
        const video = document.createElement("video");
        video.onloadeddata = () => resolve(video.duration);
        video.preload = "metadata";
        video.src = url;
        // Load video in Safari / IE11
        video.muted = true;
        video.playsInline = true;
        video.play();
      } catch (error) {}
    }
  });
};
