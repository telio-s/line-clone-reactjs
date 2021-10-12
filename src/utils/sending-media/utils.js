import { Storage } from "aws-amplify";
import aws_exports from "./../../aws-exports";
const bucket = aws_exports.aws_user_files_s3_bucket;
const region = aws_exports.aws_user_files_s3_bucket_region;

export async function uploadFiles(files) {
  const bucket = aws_exports.aws_user_files_s3_bucket;
  const region = aws_exports.aws_user_files_s3_bucket_region;
  const responsesPromise = files.map(async (file) => {
    return Storage.put(file.name, file, {
      contentType: file.type,
    }).then(
      (data) =>
        `https://${bucket}.s3.${region}.amazonaws.com/public/${data.key}`
    );
  });

  const responses = await Promise.all(responsesPromise)
    .then((resolve) => [...resolve])
    .catch(() => null);

  return responses;
}

export function changeURLImg(resizedPath) {
  const rPath = resizedPath.split("-resized");
  const path = rPath.join("");
  return path;
}

export async function handleImgError(e, count, photo) {
  if (count.current <= 0) {
    e.target.src = changeURLImg(photo);
    return;
  }
  await sleep(500);
  count.current -= 1;
  e.target.src = photo;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function setImagesLocation(files) {
  let locations = [];
  files.forEach((file) => {
    const _file = `${file.name}`;
    const addr = `https://${bucket}.s3.${region}.amazonaws.com/public/${_file}`;
    locations.push(addr);
  });
  return locations;
}
