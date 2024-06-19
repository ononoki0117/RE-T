const { user } = require('../../../common/auth/auth.sign-up');

// 회원가입 첫 화면으로 이동
const redirectToStart = function (req, res) {
    res.redirect('/sign-up/retner/agree');
}

// 리트너 회원가입 시작 - 리트너 회원가입은 항상 agree 부터 시작해야함 -> 다른 페이지로 get이 들어오면 여기로 빠져 들어오게 해야함!
const startSignUp = function (req, res) {
    console.log('환자 회원가입 시작');

    res.render('./sign-up/retner/sign-up.retner.agree.ejs');
}

// 약관 동의 여부 확인 - 체크박스가 다 체크되어 있지 않으면 넘어가지 않음
// Todo : 이거 구현이 좀 더러움 -> 더 좋은 방법 있으면 그걸로 바꿔도 됨
const confirmAgreement = function (req, res) {
    const checkboxes = [
        req.body.check_1 ? true : false,
        req.body.check_2 ? true : false,
        req.body.check_3 ? true : false,
    ];

    const isCheckedAll = checkboxes.every(val => val);
    if (isCheckedAll) {
        console.log('환자 약관 동의 확인, 본인인증으로 이동');
        res.render('./sign-up/retner/sign-up.retner.verification.ejs');
    }
    else {
        // Todo : 문구 변경
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write("<script>alert('약관에 전체 동의 해 주세요');  history.go(-1);</script>");
    }
}

// 리트너 본인 인증 - 실제 api를 쓰지는 않은 것임! 하지만 파라미터 값 인증하는 부분은 들어가야 함
const confirmVerification = function (req, res) {
    console.log('환자 본인인증 확인, 개인정보입력으로 이동');

    res.render('./sign-up/retner/sign-up.retner.enter.ejs');
}

// 리트너 ID 패스워드 입력 값 검증, 리트너 코드 DB 값 검증, 리트너 보유 환자 배열 안에 환자 추가
const confirmPrivacyInformation = function (req, res) {
    // model에 값 주입
    user.model = req.body;
    user.model.kind = "retner";
    console.log(user.model);

    // 필드에 값이 빈 경우 찾기
    const isEmpty = (object) => !Object.values(object).every(x => (x !== null && x !== ''));
    if (isEmpty(user.model)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write("<script>alert('입력값을 전부 채워주세요');  history.go(-1);</script>");
        return;
    }

    if (user.model.password != req.body.password_repeat) {
        // Todo : 로직 변경 -> 아마 바로 history 뒤로 가면 안될 거임... 
        // Todo : 문구 변경 
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write("<script>alert('비밀번호 확인값이 비밀번호와 다릅니다!');  history.go(-1);</script>");
        return;
    }

    delete user.model.password_repeat;

    user.register()
        .then((result) => {
            console.log(`프로미스의 결과값? ${JSON.stringify(result)}`);
            res.render('./sign-up/retner/sign-up.retner.info.ejs')
        })
        .catch((result) => {
            console.log(`망한 프로미스의 결과값? ${JSON.stringify(result)}`)
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.write("<script>alert('ID가 중복됩니다! 다른 아이디를 사용해 주세요!');  history.go(-1);</script>");
        })
}

// 환자 프로필 사진 서버에 저장 후 회원가입 완료 절차
const confirmProfile = function (req, res) {
    console.log('리트너 정보 등록 완료, 홈 화면으로 이동');

    res.redirect('/');
}

// agree를 건너뛰고 다른 페이지부터 접근하면(get방식으로 접근하면), 혹은 세션에 있는 값이 잘못되면 호출됨
const detectInvalidAccess = function (req, res) {
    console.log('문제 발생! 약관 동의 화면으로 이동...');

    res.redirect('/sign-up/retner');
}

module.exports = { startSignUp, confirmAgreement, confirmVerification, confirmPrivacyInformation, confirmProfile, redirectToStart, detectInvalidAccess };