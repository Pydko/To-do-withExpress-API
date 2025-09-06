import { validationResult } from "express-validator";

/**
 * Kullanım:
 * router.post("/", validate([ body("brand").notEmpty() ... ]), handler)
 */
export function validate(rules = []) {
  return [
    ...rules,
    (req, res, next) => {
      const result = validationResult(req);
      if (result.isEmpty()) return next();

      // Hata formatını tek yerden belirliyoruz
      const errors = result.array().map(e => ({
        field: e.path,
        msg: e.msg,
        value: e.value,
        location: e.location,
      }));

      return res.status(400).json({ errors });
    }
  ];
}
