
// 로그인을 했을 경우 본인 페이지로 이동, 아닌 경우 로그인 페이지로 이동 
const checkUserLogin = function (req, res) {
    console.log('로그인 여부 확인');

    if (req.session.user) {
        console.log('유저 페이지로 이동');

        res.send('유저 홈페이지~');
    } else {
        res.redirect('/login');
    }
}


module.exports = { checkUserLogin };