# DMAH — 디마 세계관 홈페이지

예시로 보내주신 `아르카` 사이트의 구성(넓은 사진형 첫 화면, 상단 메뉴, 세계관 카드, 조직 파일, 인물, 연표, 봉인 기록)을 참고해 만든 **독립형 반응형 홈페이지**입니다. Notion 페이지를 그대로 공개하는 방식이 아닙니다.

## 미리보기

`index.html`을 웹 호스팅에 올리면 홈페이지가 열립니다. 컴퓨터에서 미리 보려면 이 폴더에서 간단한 웹 서버를 실행하세요.

- Windows: `미리보기.bat`을 실행한 다음 브라우저에서 `http://localhost:8000`을 엽니다.
- Mac/Linux: 터미널에서 `python3 -m http.server 8000` 실행 후 `http://localhost:8000`을 엽니다.

## 글과 이미지 수정

1. `edit.html`을 같은 사이트 주소에서 엽니다.
2. 첫 화면 문구, 현상, 모뉴먼트, 인물, 연표를 폼에서 수정하거나 항목을 추가합니다.
3. 첫 화면 이미지는 편집실에서 업로드할 수 있습니다.
4. **업데이트 파일 내려받기**를 눌러 새 `content.js`를 받습니다.
5. 홈페이지 폴더의 기존 `content.js`를 새 파일로 교체하고, 호스팅에 다시 올립니다.

`저장하고 미리보기`는 같은 브라우저에서만 확인되는 임시 미리보기입니다. 사이트의 모든 방문자에게 바꾸려면 업데이트한 `content.js`를 호스팅에 올려야 합니다. 기존 Notion 페이지와 자동 동기화되지는 않습니다.

## 공개하기

현재는 정적 사이트 파일 패키지이며, 도메인이나 호스팅 계정에는 배포되지 않았습니다. 공개 URL을 만들려면 Netlify, GitHub Pages, Cloudflare Pages 등 정적 호스팅 서비스에 폴더 내용을 올려야 합니다. 원하는 호스팅을 정하면 그 서비스에 맞춰 배포 순서를 안내할 수 있습니다.

## 파일 구조

- `index.html` — 홈페이지 본문 구조
- `styles.css` — 색상, 글꼴, 반응형 레이아웃
- `app.js` — 홈페이지 렌더링과 모바일 메뉴
- `content.js` — 사이트에 표시되는 문구와 데이터
- `edit.html`, `editor.js` — 브라우저 편집실
- `assets/hero.webp` — 첫 화면 배경 이미지

## 이미지 출처

첫 화면 사진: Carles Tomás Martí, [“A street of Shinjuku at night”](https://commons.wikimedia.org/wiki/File:A_street_of_Shinjuku_at_night.jpg), Wikimedia Commons, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). 사진은 홈페이지용으로 자르고 색감을 조정했습니다.
