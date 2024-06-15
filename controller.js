
// 로그인을 했을 경우 본인 페이지로 이동, 아닌 경우 로그인 페이지로 이동 
const checkUserLogin = function (req, res) {
    console.log('로그인 여부 확인');

    if (req.session.user) {
        console.log('유저 페이지로 이동');
        if (req.session.user.kind == "patient") {
            // 환자 유저일 경우
            res.redirect('/patient/main')
        }
        else if (req.session.user.kind == "retner") {
            // 리트너일 경우
            res.render('./main/retner/main.retner.ejs')
        }
    } else {
        res.redirect('/login');
    }
}


module.exports = { checkUserLogin };