import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, ConfigOptions } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Multer } from 'multer';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {

    const options: ConfigOptions = {
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    };
    cloudinary.config(options);

  }
  
  async uploadFile(file: Multer.File): Promise<string> {
    const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Upload failed: result is undefined'));
        resolve(result);
      }).end(file.buffer);
    });
    return uploadResult.secure_url;
  }

  async deleteFile(publicId: string): Promise<{ result: string }> {
    return cloudinary.uploader.destroy(publicId);
  }
}
