const connection = require('../../../common/database/database.connect').connect;

// 회원가입 첫 화면으로 이동
const redirectToStart = function (req, res) {
    res.redirect('/sign-up/patient/agree');
}

// 환자 회원가입 시작 - 환자 회원가입은 항상 agree 부터 시작해야함 -> 다른 페이지로 get이 들어오면 여기로 빠져 들어오게 해야함!
const startSignUp = function (req, res) {
    console.log('환자 회원가입 시작');

    res.render('./sign-up/patient/sign-up.patient.agree.ejs');
}

// 약관 동의 여부 확인 - 체크박스가 다 체크되어 있지 않으면 넘어가지 않음
const confirmAgreement = function (req, res) {
    const checkboxes = req.body.checkbox;
    console.log(checkboxes);
    let isCheckedAll = true;

    console.log('환자 약관 동의 확인, 본인인증으로 이동');
    res.render('./sign-up/patient/sign-up.patient.verification.ejs');
}

// 환자 본인 인증 - 실제 api를 쓰지는 않은 것임! 하지만 파라미터 값 인증하는 부분은 들어가야 함
const confirmVerification = function (req, res) {
    console.log('환자 본인인증 확인, 개인정보입력으로 이동');

    res.render('./sign-up/patient/sign-up.patient.enter.ejs');
}

// 환자 ID 패스워드 입력 값 검증, 리트너 코드 DB 값 검증, 리트너 보유 환자 배열 안에 환자 추가
const confirmPrivacyInformation = function (req, res) {
    console.log('환자 회원가입 완료, 사진 등록으로 이동');

    res.render('./sign-up/patient/sign-up.patient.profile.ejs');
}

// 환자 프로필 사진 서버에 저장 후 회원가입 완료 절차
const confirmProfile = function (req, res) {
    console.log('환자 사진 등록 완료, 홈 화면으로 이동');

    res.send('가입 완료! 홈 화면이 될 화면!!');
}

// agree를 건너뛰고 다른 페이지부터 접근하면(get방식으로 접근하면), 혹은 세션에 있는 값이 잘못되면 호출됨
const detectInvalidAccess = function (req, res) {
    console.log('문제 발생! 약관 동의 화면으로 이동...');

    res.redirect('/sign-up/patient');
}

module.exports = { startSignUp, confirmAgreement, confirmVerification, confirmPrivacyInformation, confirmProfile, redirectToStart, detectInvalidAccess };