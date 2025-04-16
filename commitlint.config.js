const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // <type> : 제시된 커밋 유형만 허용됨
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'build', 'ci', 'perf', 'revert']
    ],
    // <type> : 항상 소문자로 작성
    'type-case': [2, 'always', 'lower-case'],
    // <type> : 커밋 타입 작성 필수
    'type-empty': [2, 'never'],
    // <scope> : 커밋 범위는 항상 소문자로 작성 (선택 사항))
    'scope-case': [2, 'always', 'lower-case'],
    // <subject> : 커밋 제목 항상 소문자
    'subject-case': [2, 'always', 'lower-case'],
    // <subject> : 커밋 제목 작성 필수
    'subject-empty': [2, 'never'],
    // <subject> : 커멧 제목 끝 마침표 불가
    'subject-full-stop': [2, 'never', '.'],
    // <subject> : 커밋 제목 최대 50자
    'subject-max-length': [2, 'always', 50],
    // <header> : 커밋 헤더(<type>(<scope>): <subject>) 최대 72자
    'header-max-length': [2, 'always', 72],
    // <body> : 본문이 있는 경우, 제목과 본문 사이에 한 줄 공백 필수
    'body-leading-blank': [1, 'always'],
    // <footer> : 꼬리말이 있는 경우, 본문 또는 제목과 꼬리말 사이에 한 줄 공백 필수
    'footer-leading-blank': [1, 'always']
  }
};

export default commitlintConfig;
