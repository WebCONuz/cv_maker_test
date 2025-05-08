import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 } from 'uuid';

@Injectable()
export class FileService {
  async saveImage(image: any) {
    try {
      const fileName = v4() + '.jpg';
      const dirPath = path.resolve(__dirname, '..', '..', 'public', 'images');

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      if (
        image.mimetype === 'image/jpeg' ||
        image.mimetype === 'image/jpg' ||
        image.mimetype === 'image/png'
      ) {
        fs.writeFileSync(path.join(dirPath, fileName), image.buffer);
        return fileName;
      } else {
        throw new BadRequestException(
          'Faqat rasm yuklash mumkin: [.jpeg | .jpg | .png]',
        );
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('File uploadda xatolik');
    }
  }
}
