import Compress from "compress.js";
export async function resizeImages(files, setResizedImgs, setFiles) {
  const compress = new Compress();
  await compress
    .compress([...files], {
      size: 2,
      quality: 0.75, // the quality of the image, max is 1,
      maxWidth: 1000, // the max width of the output image, defaults to 1920px
      maxHeight: 1000, // the max height of the output image, defaults to 1920px
      resize: true, // defaults to true, set false if you do not want to resize the image width and height
    })
    .then((data) => {
      // returns an array of compressed images
      convertToFile(data, setResizedImgs, setFiles);
    })
    .catch((error) => {
      console.log(error);
    });
}

function convertToFile(data, setResizedImgs, setFiles) {
  data.forEach((img) => {
    const base64str = img.data;
    const imgExt = img.ext;
    const file = Compress.convertBase64ToFile(base64str, imgExt);
    setFiles((prevFiles) => [...prevFiles, { file, name: img.alt }]);
    setResizedImgs((prevResizedImgs) => [
      ...prevResizedImgs,
      img.prefix + "" + base64str,
    ]);
  });
}
