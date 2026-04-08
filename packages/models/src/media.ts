import { db } from "@/lib/prisma";
import type { Prisma } from "generated/prisma/client";

export class Media {
  async create(data: {
    diskName: string;
    displayName: string;
    mimeType: string;
    size: number;
    uploadedById?: string;
    metadata?: any;
  }) {
    return db.mediaFile.create({
      data: {
        diskName: data.diskName,
        displayName: data.displayName,
        mimeType: data.mimeType,
        size: data.size,
        uploadedById: data.uploadedById || null,
        metadata: data.metadata,
      },
    });
  }

  async findById(id: string) {
    return db.mediaFile.findUnique({
      where: { id },
      include: {
        uploadedBy: { select: { id: true, name: true } },
      },
    });
  }

  async findMany(params: {
    search?: string;
    mimeTypePrefix?: string;
    page?: number;
    limit?: number;
  }) {
    const { search, mimeTypePrefix, page = 1, limit = 20 } = params;
    const where: Prisma.MediaFileWhereInput = {};
    if (mimeTypePrefix) where.mimeType = { startsWith: mimeTypePrefix };
    if (search) {
      where.displayName = { contains: search, mode: "insensitive" };
    }
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      db.mediaFile.findMany({
        where,
        skip,
        take: limit,
        orderBy: { uploadedAt: "desc" },
        include: { uploadedBy: { select: { name: true } } },
      }),
      db.mediaFile.count({ where }),
    ]);
    return { items, total, page, limit };
  }

  async update(
    id: string,
    data: {
      displayName?: string;
      metadata?: any;
    },
  ) {
    return db.mediaFile.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return db.mediaFile.delete({ where: { id } });
  }

  async linkToFinding(mediaFileId: string, findingId: string) {
    return db.examinationFinding.update({
      where: { id: findingId },
      data: { mediaFileId },
    });
  }

  async linkToInvestigationResult(mediaFileId: string, resultId: string) {
    return db.investigationResult.update({
      where: { id: resultId },
      data: { mediaFileId },
    });
  }

  async unlinkFromFinding(findingId: string) {
    return db.examinationFinding.update({
      where: { id: findingId },
      data: { mediaFileId: null },
    });
  }

  async unlinkFromInvestigationResult(resultId: string) {
    return db.investigationResult.update({
      where: { id: resultId },
      data: { mediaFileId: null },
    });
  }
}

export const media = new Media();
