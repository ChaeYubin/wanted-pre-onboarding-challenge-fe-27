# 원티드 프리온보딩 챌린지 프론트엔드 코스 11월

## 프로젝트 소개

[원티드 프리온보딩 챌린지 사전 과제](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)로 제작한 투두리스트 애플리케이션입니다.

<img src="https://github.com/user-attachments/assets/49a4fcaf-4209-48b7-ad42-5cb076cfeaf3" width="700px"/>


## 실행 방법

### 프론트엔드

[배포 링크](https://grayish-todo-app.vercel.app/)를 방문하시거나, 아래 명령어를 터미널에 입력해주세요.

```bash
git clone https://github.com/ChaeYubin/wanted-pre-onboarding-challenge-fe-27.git todo-app
cd todo-app
npm install
npm run dev # http://localhost:3000
```

### 백엔드

서버는 [해당 레포지토리](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)를 사용합니다.
서버를 실행시키기 위해서는 아래 명령어를 입력해 주세요.

```bash
git clone https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api.git todo-app-server
cd todo-app-server
yarn
yarn start # http://localhost:8080
```

## 구현 기능

- 회원가입 및 로그인 기능
- 투두리스트 추가 및 수정, 삭제 기능

## 개발 환경

- React + Vite + Typescript
- react-router-dom
- Zustand
- Axios
- TailwindCSS + shadcn/ui
- ESLint, Prettier
