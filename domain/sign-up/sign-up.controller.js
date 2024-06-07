// 회원종류 선택 페이지로 이동
const enterSelect = function (req, res) {
    console.log('회원종류 선택 페이지');

    res.render('./sign-up/sign-up.select.ejs');
};

module.exports = { enterSelect };