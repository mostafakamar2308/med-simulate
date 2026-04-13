import { db } from "@/lib/prisma";
import type { Prisma } from "generated/prisma/client";

export class Grading {
  async upsertAttempt(data: {
    studentId: string;
    caseId: string;
    section: "HISTORY" | "EXAM" | "INVESTIGATIONS" | "DIAGNOSIS";
    score: number;
    feedback: string;
    rawResponse: any;
    missingItems?: string[];
    isCorrect?: boolean;
  }) {
    const updateData: Prisma.GradingAttemptUpdateInput = {
      score: data.score,
      feedback: data.feedback,
      rawResponse: data.rawResponse,
    };
    if (data.missingItems !== undefined) {
      updateData.missingItems = data.missingItems;
    }
    if (data.isCorrect !== undefined) {
      updateData.isCorrect = data.isCorrect;
    }

    const createData: Prisma.GradingAttemptCreateInput = {
      studentId: data.studentId,
      caseId: data.caseId,
      section: data.section,
      score: data.score,
      feedback: data.feedback,
      rawResponse: data.rawResponse,
    };
    if (data.missingItems !== undefined) {
      createData.missingItems = data.missingItems;
    }
    if (data.isCorrect !== undefined) {
      createData.isCorrect = data.isCorrect;
    }

    return db.gradingAttempt.upsert({
      where: {
        studentId_caseId_section: {
          studentId: data.studentId,
          caseId: data.caseId,
          section: data.section,
        },
      },
      update: updateData,
      create: createData,
    });
  }

  async getAttempt(studentId: string, caseId: string, section: string) {
    return db.gradingAttempt.findUnique({
      where: {
        studentId_caseId_section: {
          studentId,
          caseId,
          section: section as any,
        },
      },
    });
  }

  async getAllAttemptsForCase(studentId: string, caseId: string) {
    return db.gradingAttempt.findMany({
      where: { studentId, caseId },
    });
  }
}

export const grading = new Grading();
