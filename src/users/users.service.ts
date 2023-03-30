import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import * as AWS from 'aws-sdk';
import * as sharp from 'sharp';
import { code } from 'src/helper/codes';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  async sharpPipe(buffer, width, height) {
    return await sharp(buffer).resize(width, height).toBuffer()
  }

  async uploadImages(image, fileName) {
    const s3 = new AWS.S3({
      apiVersion: '2023-03-29',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const bucket = process.env.AWS_S3_BUCKET_NAME;
    const acl = 'public-read';

    const sharpImage = await this.sharpPipe(image, 800, 800);

    const params = [{
      Bucket: bucket,
      Key: `original_image/${fileName}`,
      ACL: acl,
      Body: image,
    },
    {
      Bucket: bucket,
      Key: `thumbnail_image/${fileName}`,
      ACL: acl,
      Body: sharpImage,
    }];

    return await Promise.all(params.map(p => s3.upload(p).promise()))
    .then(async res => {
      return res;
    }).catch(err => {
      return err;
    });
  }

  async uploadImage(image: any): Promise<any> {
    try {
      let uploadData: any
      if(image && image.buffer) {
        uploadData = await this.uploadImages(image.buffer, image.originalname);

        if(!uploadData) {
          throw new HttpException('Failed to upload image', HttpStatus.BAD_REQUEST)
        }

        const fileStorageInDB = new Image()
        fileStorageInDB.image = image.originalname;
        fileStorageInDB.imageUrl = uploadData[0].Location;
        fileStorageInDB.imageKey = uploadData[0].Key;
        fileStorageInDB.thumbnailImageUrl = uploadData[1].Location;
        fileStorageInDB.thumbnailImageKey = uploadData[1].key;
        
        const filestored = await this.imageRepository.save(fileStorageInDB);
        return {
          statusCode: code.success,
          message: 'Image uploaded successfully',
          data: filestored
        };
      }
      
    } catch (error) {
      throw error;
    }
  }

}
