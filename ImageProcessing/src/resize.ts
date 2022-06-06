import sharp from 'sharp';

const ResizeImage = async (
  filename: string,
  width: number,
  height: number
): Promise<void> => {
  await sharp(`./images/${filename}.jpg`)
    .resize(width as unknown as number, height as unknown as number)
    .toFile(`thumbs/${filename}_${width}_${height}.jpg`);
};

export default ResizeImage;
