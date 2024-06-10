const connection = require('../../common/database/database.connect');
const auth = require('../../common/auth/auth.login');

const getLoginPage = function (req, res) {
    console.log('로그인 페이지');
    if (req.session.user) {
        res.redirect('/');
    }
    res.render('./login/login.ejs');
}

const attemptLogin = function (req, res) {
    console.log('로그인 값 인증');

    console.log('아이디 : ' + req.body.id);
    console.log('비밀번호 : ' + req.body.password);

    const db = connection.getDB();

    auth.findUserInformation(db, req.body.id, req.body.password)
        .then((result) => {
            if (result == "no id") {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write("<script>alert('아이디가 존재하지 않습니다');  history.go(-1);</script>");
            } else if (result == "not match") {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write("<script>alert('비밀번호가 올바르지 않습니다');  history.go(-1);</script>");
            }
            else {
                delete result.patient_password;
                req.session.user = result;
                req.session.user_kind = "patient";
                console.log(req.session);
                res.redirect('/');
            }
        }).catch((err) => {
            console.log(err);
        });

}

module.exports = { getLoginPage, attemptLogin };