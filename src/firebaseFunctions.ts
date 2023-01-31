import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString,
} from 'firebase/storage';
import app from './firebase';

/**
 * @param file - file from input
 * @param location - string eg. "image/"
 */
export function uploadFile(file: File, location: string) {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, location + Date.now() + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}

export function uploadFileBase64(file: string, location: string) {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const image = file.split(',')[1]; // prevents FirebaseError: Firebase Storage: String does not match format 'base64': Invalid character found (storage/invalid-format)
    const filename = location + Date.now() + '.png';
    const storageRef = ref(storage, filename);
    uploadString(storageRef, image, 'base64')
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      })
      .catch((error) => reject(error));
  });
}

/**
 * @param url - url of image/file
 */
export function deleteFile(url: string | undefined) {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, url);

    deleteObject(storageRef)
      .then(() => {
        resolve(null);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
