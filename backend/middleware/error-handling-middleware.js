module.exports = function (err, req, res, next) {

  switch (err.message) {

    case 'LoggedInFailed':
    return res.send(401).send({
      errorMessage: '로그인을 실패했습니다!',
     });

    case "InputValidation":
    case 'accessTokenNotMatched' :
      return res.status(400).send({
        errorMessage: "입력된 요청이 잘못됐습니다.",
      })

    case "Unauthorized":
      return res.status(401).send({
        errorMessage: "인증을 실패했습니다.",
      });

      default: 
      return res.status(500).send({
        errorMessage: "서버에 오류가 있습니다.",
      });
  }
};