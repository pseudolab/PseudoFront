
export const typeValidationMixin = {
  // 해당 믹스인은 mixins/common/head.js 에 믹스인 되어 있습니다.
  methods: {
    validStr: str => str || str instanceof String,
    validNum: int => int || int instanceof Number    
  }
}