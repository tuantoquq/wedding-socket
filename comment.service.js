import { prisma } from './prisma.service.js';

export async function addWish(wish) {
  return await prisma.comment.create({
    data: wish,
  });
}
