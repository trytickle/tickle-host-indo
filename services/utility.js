export const resizeImage = (file, callback) => {
  if (file.type.match(/image.*/)) {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const max_size = 1024;
        let width = image.width;
        let height = image.height;

        if (width > max_size) {
          height *= max_size / width;
          width = max_size;
        }

        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);

        const blobBin = atob(dataUrl.split(',')[1]);
        let array = [];
        for (let i = 0; i < blobBin.length; i++) {
          array.push(blobBin.charCodeAt(i));
        }
        const outputFile = new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
        callback(readerEvent.target.result, outputFile);
      }
      image.src = readerEvent.target.result;
    }
    reader.readAsDataURL(file);
  }
};
