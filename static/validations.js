

export const primitiveRules = {
  str: str => str || str instanceof String,
  int: int => int || int instanceof Number
}