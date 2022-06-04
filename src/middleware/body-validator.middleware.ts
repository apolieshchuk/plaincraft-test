import { NextFunction, Response, Request } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ClassConstructor } from "class-transformer/types/interfaces";

/**
 *  Simple function for validate incoming DTO in server requests body
 *
 * @param dtoClass
 */
const bodyValidation = <T extends object>(dtoClass: ClassConstructor<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const output = plainToInstance(dtoClass, req.body);
    validate(output).then(errors => {
      if (errors.length > 0) {
        console.log(errors);

        let errorTexts = errors.reduce((acc, err) => {
          return acc.concat(err.constraints)
        }, Array<Record<string, string>>());

        res.status(400).send({
          status: 'error',
          errors: errorTexts
        });

        return;
      } else {
        res.locals.input = output;
        next();
      }
    });
  };
};

export default bodyValidation