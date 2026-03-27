import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import type { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Fotos')
@Controller('foto')
export class FotoController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + extname(file.originalname));
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Solo imágenes permitidas'), false);
      }
      cb(null, true);
    },
    limits: { fileSize: 2 * 1024 * 1024 }
  }))
  uploadFoto(@UploadedFile() file: Express.Multer.File) {
    return { url: `http://localhost:3000/foto/${file.filename}` };
  }

  @Get(':filename')
  getFoto(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(join(process.cwd(), 'uploads', filename));
  }
}