# 설치!!

Typescript 설치

(기존 Create React App으로 만든 프로젝트에 타입스크립트 설치)
npm install --save typescript @types/node @types/react @types/react-dom @types/jest

Create React App을 타입스크립트로 시작하기

npx create-react-app my-app --template typescript 또는
You are running `create-react-app` 4.0.3, which is behind the latest release (5.0.0). 오류가 뜬다면 아래 명령어로 진행
npx create-react-app@5.0.0 my-app --template typescript

https://create-react-app.dev/docs/adding-typescript

Styled-Component 설치 (typeScript 용)
npm install --save @types/styled-components

react router, react query 설치
npm i react-router-dom react-query


리액트 쿼리 설치
npm i react-query

리액트 그래프 차트 설치
npm install --save react-apexcharts apexcharts

리액트 헬멧 설치 HTML 의 TITLE 값을 변경해줌
npm i react-helmet
npm i --save-dev @types/react-helmet

리엑트 recoil 설치 : 최상단 APP의 state 값을 최하단 컴포넌트에서 사용시
연결되어 있는 컴포넌트로 무한정 넘겨줘야 하는 이슈가 발생.
recoil 설치시 버블 형태로 띄워놓고 useState처럼 자연스럽게 사용 할 수 있음.

npm install recoil

react-beautiful-dnd 설치

npm i react-beautiful-dnd
npm i --save-dev @types/react-beautiful-dnd

https://www.npmjs.com/package/react-beautiful-dnd
https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/about/installation.md

react-beautiful-dnd 테스트해 보기
https://react-beautiful-dnd.netlify.app/iframe.html?id=board--simple

react-beautiful-dnd 예시 코드
https://codesandbox.io/s/k260nyxq9v
# -------------------------------------------------------------------------

색상 선택 page 
https://flatuicolors.com/palette/gb


코인 API 
https://api.coinpaprika.com/v1/coins

코인 로고 API
https://cryptoicon-api.vercel.app/api/icon/btc

React APEX CHARTS Doc
https://apexcharts.com/docs/react-charts

----------------------------------------------------------
코드 챌린지

- 스타일 꾸미기
- 작성한 모든 투두를 localStorage에 저장 및 로드하기
- 투두 삭제하기
- 보드 생성하기
- 보드끼리도 순서 바꾸기