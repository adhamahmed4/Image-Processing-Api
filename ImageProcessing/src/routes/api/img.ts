import express from 'express';
import ResizeImage from '../../resize';
import fs from 'fs';
import path from 'path';

const image = express.Router();

image.get(
  '/image',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const fileExist: boolean = fs.existsSync(
      path.resolve(`images/${req.query.filename}.jpg`)
    );
    if (fileExist == true) {
      if (Number(req.query.width) > 0 && Number(req.query.height) > 0) {
        const filepath = path.resolve(
          `thumbs/${req.query.filename}_${req.query.width}_${req.query.height}.jpg`
        );
        if (fs.existsSync(filepath)) {
          res.sendFile(filepath);
        } else {
          await ResizeImage(
            req.query.filename as string,
            Number(req.query.width),
            Number(req.query.height)
          );

          try {
            res.sendFile(filepath);
          } catch (err) {
            res.send('filename is incorrect');
          }
        }
      } else {
        res.send('Image dimensions must be positive values');
      }
    } else {
      res.send('image is not found');
    }
  }
);

image.delete(
  '/images/delete',
  (req: express.Request, res: express.Response): void => {
    fs.readdir('thumbs', (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join('thumbs', file), err => {
          if (err) throw err;
        });
      }
    });
    res.send('Images are deleted successfuly');
  }
);

export default image;
