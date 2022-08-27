import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from "uuid";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class FilesService {

  async createFile(file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..' , 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdir(filePath, { recursive: true }, (err) => {
          if (err) {
            return console.error(err);
          }
          console.log('Directory created successfully!');
        });
      };
      fs.writeFileSync(path.join(filePath, fileName), file.buffer)
      return fileName;
    } catch(e) {
      console.log(e)
      throw new HttpException('При записи файла поизошла ошибка', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
