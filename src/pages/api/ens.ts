import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Main entry point for API endpoints
 *
 * @param  {NextApiRequest} req
 * @param  {NextApiResponse} res
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: This routing logic is a bit of a hack
  // There should be a cleaner way of organizing
  if (req.method === 'GET') {
    if (req.query.ensName !== undefined) {
      // get one ensName
      const ensName = req.query.ensName as string;
      const result = await prisma.ensName.findFirst({
        where: { text: ensName },
      });

      res.json(result);
    } else {
      // get all ensNames
      const ensNames = await prisma.ensName.findMany({
        orderBy: { createdAt: 'desc' },
      });

      res.json(ensNames);
    }
  } else if (req.method === 'POST') {
    // create ens name
    const text = JSON.parse(req.body).text;
    const ens = await prisma.ensName.create({
      data: { text },
    });

    res.json(ens);
  } else if (req.method === 'PUT') {
    // update ens
    const id = req.query.ensId as string;
    const data = JSON.parse(req.body);
    const ens = await prisma.ensName.update({
      where: { id },
      data,
    });

    res.json(ens);
  } else if (req.method === 'DELETE') {
    // delete ens
    const id = req.query.ensNameId as string;
    await prisma.ensName.delete({ where: { id } });

    res.json({ status: 'ok' });
  }
};
