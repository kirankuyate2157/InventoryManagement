import axios from "axios";


const getUploadUrl = async (fileName, contentType) => {
  try {
    const response = await axios.get(`/s3/generate-upload-url?fileName=${fileName}&contentType=${contentType}`
    );
    return response.data.url;
  } catch (error) {
    console.error("Error fetching upload URL:", error);
    throw error;
  }
};

const getDownloadUrl = async (fileName) => {
  try {
    const response = await axios.get(`/s3/generate-download-url?fileName=${fileName}`
    );
    return response.data.url;
  } catch (error) {
    console.error("Error fetching upload URL:", error);
    throw error;
  }
};
// Function to upload a file using the signed URL
const uploadDoc = async (file) => {
  try {
    if (!(file instanceof File)) {
      console.log("it url: ", file)
      return file;
    }
    const uploadData = await getUploadUrl(file.name, file.type);
    const uploadURL = uploadData;

    console.log("uploadUrl", uploadData, uploadURL);

    const isUpload = await axios.put(uploadURL, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    let downloadUrl;
    if (isUpload) {
      downloadUrl = await getDownloadUrl(file.name);

      if (!downloadUrl) console.log("get url fail! ");
      console.log("download url : " + JSON.stringify(downloadUrl));
      return downloadUrl;
    } else {
      console.log("fail to get download url due to un upload file ");
    }

    console.log("File uploaded successfully.");
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const handleS3Upload = async (images) => {
  try {
    const modifiedImages = await Promise.all(images.map(uploadDoc));
    return modifiedImages;
  } catch (error) {
    console.error("Error setting up request:", error.message);
  }
}

export { uploadDoc, handleS3Upload };
