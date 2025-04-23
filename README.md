# todo-app

## ESLint & Prettier

**사용한 패키지**

```
eslint
@eslint/js
eslint-config-airbnb-base
eslint-config-prettier
eslint-plugin-prettier
eslint-plugin-import
globals
```

## git husky

**관련 파일**

```
.husky/
├── commit-msg ← 커밋 메시지 규칙 체크
├── pre-commit ← 린트, 포맷
├── pre-push ← 린트

root/
├── commitlint.config.js ← 커밋 메시지 규칙
├── .gitmessage.txt ← 커밋 메시지 템플릿 (참고용)
```

**사용한 패키지**

```
husky
@commitlint/cli
@commitlint/config-conventional
```
