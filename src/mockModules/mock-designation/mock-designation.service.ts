import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDesignationDto, UpdateDesignationDto } from "./dto";

@Injectable()
export class MockDesignationService {
  constructor(private prisma: PrismaService) {}

  async createDesignation(createDto: CreateDesignationDto) {
    return await this.prisma.designation.create({
      data: createDto,
    });
  }

  async findAllDesignations() {
    return await this.prisma.designation.findMany();
  }

  async findDesignationById(id: number) {
    return await this.prisma.designation.findUnique({
      where: { id },
    });
  }

  async findUsersWithDesignationId(id: number) {
    const designation = await this.findDesignationById(id);
    return await this.prisma.userMetadata.findMany({
      where: {
        designation: designation?.name,
      },
    });
  }

  async updateDesignation(id: number, updateDto: UpdateDesignationDto) {
    return await this.prisma.designation.update({
      where: { id },
      data: updateDto,
    });
  }

  async removeDesignation(id: number) {
    return await this.prisma.designation.delete({
      where: { id },
    });
  }
}
