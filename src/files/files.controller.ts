import {
    Controller,
    Get,
    Post,
    UseInterceptors,
    UploadedFile,
    ParseFilePipe, MaxFileSizeValidator, UseGuards
} from '@nestjs/common';
import {FilesService} from './files.service';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {fileStorage} from "./storage";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";

@Controller('files')
@ApiTags('files')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
    constructor(private readonly filesService: FilesService) {
    }

    @Get()
    findAll() {
        return this.filesService.findAll();
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: fileStorage,
    }))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                }
            }
        }
    })
    create(@UploadedFile(
        new ParseFilePipe({
            validators: [new MaxFileSizeValidator({maxSize: 1024 * 1024 * 5})]
        })
    ) file: Express.Multer.File) {
        return file;
    }
}
