import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Enrollment } from './entities/enrollment.entity';

@ApiTags('Enrollments')
@ApiBearerAuth('token')
@Controller('enrollments')
@UseGuards(JwtAuthGuard)
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @ApiResponse({ status: 201, type: Enrollment })
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(createEnrollmentDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Enrollment] })
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Enrollment })
  findOne(@Param('id') id: string) {
    return this.enrollmentsService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: Enrollment })
  update(@Param('id') id: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentsService.update(id, updateEnrollmentDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: Enrollment })
  remove(@Param('id') id: string) {
    return this.enrollmentsService.remove(id);
  }
}
