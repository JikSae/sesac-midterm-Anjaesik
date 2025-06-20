const { body, validationResult } = require('express-validator');
const { param } = require('../routes/post.router');

//회원 가입
exports.signUpValidator = [
  body('email')
    .isEmail().withMessage('이메일형식이 아닙니다')
    .notEmpty().withMessage('이메일이 없습니다.'),
  body('password')
    .notEmpty().withMessage('패스워드가 없습니다.'),
  body('nickname')
    .notEmpty().withMessage('닉네임이 없습니다.'),
];

// 로그인
exports.loginValidator = [
  body('title')
  .notEmpty().withMessage("타이틀 없습니다."),
  body('content')
  .notEmpty().withMessage("컨텐츠가 없습니다.")
]

//게시글 작성
exports.postValidator = [
 body('title')
  .notEmpty().withMessage("타이틀 없습니다."),
  body('content')
  .notEmpty().withMessage("컨텐츠가 없습니다.")
]

//특정 게시글 조회
exports.getPostValidator = [
  param('postId')
  .isInt().withMessage("postId가 숫자여야함")
  .notEmpty().withMessage('postId가 필요합니다.'),
];




exports.handleValidationResult = (req, res, next) => {
  const result = validationResult(req).errors;
  if (result.length !== 0) {
    // 입력 오류가 있는 경우
    const extracteError = result.map(err => err.msg)
    // console(extracteError)
    return next(new Error("InputValidation"));
  }
  next();
}