import type { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { getMetadataArgsStorage } from 'typeorm';
import { tryCatch } from '../middleware/try-catch.middleware';
import { GenericEntity } from '../entities/generic.entity';

export class Validator {
  private isValidEntity<T extends typeof GenericEntity>(Entity: T) {
    const entityMetadata = getMetadataArgsStorage().tables.find((table) => table.target === Entity);

    return !!entityMetadata;
  }

  validateRequestData(schema: ObjectSchema<unknown>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.validateAsync({ query: req.query, body: req.body }, { stripUnknown: true });
        next();
      } catch (error) {
        const message = error instanceof Error ? error.message : error;
        res.status(400).json({ message });
      }
    };
  }

  isExists<T extends typeof GenericEntity>(Entity: T) {
    if (!this.isValidEntity(Entity)) {
      throw new Error('Invalid entity');
    }
    return tryCatch(async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const record = await Entity.findOneBy({ id });
      if (!record) {
        res.status(400).json({ message: `Could not find record with id:${id}` });
        return;
      }
      next();
    });
  }
}

const validator = new Validator();
export default validator;
