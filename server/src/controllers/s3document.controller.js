import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const generateUrl = async (req, res) => {
  const { fileName, contentType } = req.query;

  const s3Client = new S3Client({
    region: process.env.region,
    credentials: {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
    },
  });

  if (!fileName || !contentType) {
    return res.status(400).json({ error: "File name or content type missing" });
  }

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: `${fileName}`,
    ContentType: contentType,
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 180 });
    res.status(200).json({ url });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({ error: "Failed to generate signed URL" });
  }
};

const getDownloadUrl = async (req, res) => {
  const { fileName } = req.query;

  const s3Client = new S3Client({
    region: process.env.region,
    credentials: {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
    },
  });

  if (!fileName) {
    return res.status(400).json({ error: "File name missing" });
  }

  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
  });

  try {
    const url = await getSignedUrl(s3Client, command);
    res.status(200).json({ url });
  } catch (error) {
    console.error("Error generating download URL:", error);
    res.status(500).json({ error: "Failed to generate download URL" });
  }
};

const deleteFile = async (req, res) => {
  const { fileName } = req.query;

  const s3Client = new S3Client({
    region: process.env.region,
    credentials: {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
    },
  });

  if (!fileName) {
    return res.status(400).json({ error: "File name missing" });
  }

  const command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
  });

  try {
    await s3Client.send(command);
    res.status(200).json({ message: `File ${fileName} deleted successfully` });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: `Failed to delete file ${fileName}` });
  }
};

export { generateUrl, getDownloadUrl, deleteFile };
