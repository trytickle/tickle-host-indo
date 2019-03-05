import {auth, db, storage, storagePath } from '~/plugins/firebase';

export const updateSubmissionField = async (name, value, submissionId) => {
  const updateObj = {};
  updateObj[name] = value;
  if (localStorage.isApproved === 'true') {
    await db.collection("experiences").doc(submissionId).update(updateObj);
  }
  return await db.collection("submissions").doc(submissionId).set(updateObj, { merge: true });
}

export const uploadImage = async (submissionId, imageFile) => {
  try {
    const name = String(Date.now());
    let uploadRef;
    if (!imageFile.type.includes("video")) {
      uploadRef = storage.child(`media/submissions/${submissionId}`).child(`${name}.jpg`);
    } else {
      uploadRef = storage.child(`media/submissions/${submissionId}`).child(`${name}.mp4`);
    }
    const metadata = {
      contentType: 'image/jpeg',
      customMetadata: {
        'Uploaded': Date().toString()
      }
    };
    const uploadTask = await uploadRef.put(imageFile, metadata);
    const downloadUrl = await uploadTask.ref.getDownloadURL();

    return downloadUrl;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export const uploadImageToVerification = async (side, imageFile) => {
  try {
    const name = auth.currentUser.uid+"-"+side;
    const uploadRef = storage.child(`verified/${auth.currentUser.uid}`).child(`${name}.jpg`);

    const metadata = {
      contentType: 'image/jpeg',
      customMetadata: {
        'Uploaded': Date().toString()
      }
    };
    const uploadTask = await uploadRef.put(imageFile, metadata);
    const downloadUrl = await uploadTask.ref.getDownloadURL();

    return downloadUrl;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export const deletePhotoFromStorage = async (url) => {
  try {
    const ref = storagePath.refFromURL(url);
    await ref.delete();
  } catch (error) {
    console.error(error);
  }
}
