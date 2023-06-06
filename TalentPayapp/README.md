# Talent Payapp

A Paying app for the Project Talent Payment System  

This app will be used by real user. Considering good UI / UX always

## Pusposes

- **Scan the QR Code** for identify user

- After scanning the QR code, **Go to the payment screen**

- Payment by **communicate with server**

## How to setting the project up

### iOS

1. Clone this project

1. Run `yarn install`

1. Run `cd ios && pod install && cd ..` for install the libraries to the ios pre-build file

1. Run `yarn ios` for build and testing

*After build once with `yarn ios`*, you can use `yarn start` instead of `yarn ios`  
It's faster, but will not include recently added libraries

### Android

| I will fill it up later

## How to contribute

### 디렉토리 구조

Expo 기반의 RN(React Native) 프로젝트 구조는 다음과 같다

> 참고 : --* 로 표시된 경우 폴더

```zsh
(Root) # 이 프로젝트의 경우 TalentPayapp
    ├(생략)
    ...
    ├── App.js # React 프로젝트의 App.js 와 유사. 네비게이션을 구현함.
    ├── README.md # 이 문서
    ├─* android # 안드로이드 빌드 폴더
    ├── app.json # 앱 설정 파일 - 수정 거의 안함
    ├─* assets # React 프로젝트의 Public 폴더와 유사
    ├── index.js # 프로젝트 시작점 - App.js를 포인팅함
    ├─* ios # iOS 빌드 폴더
    ├── metro.config.js # 빌드 툴 Metro 설정 파일 - 수정 거의 안함
    # 여기서부터 중요!
    ├─* Screens # 화면 단위 구현
    └─* Components # 화면에 쓸 컴포넌트들 구현
```

## File naming

- 스크린들은 대문자로 시작하고, Carmel case를 알잘딱하게 사용

  ex) `HomeScreen.jsx`, `QrscanScreen.jsx` 등

- 컴포넌트들은 대문자로 시작하고, 역시 Carmel case를 알잘딱하게 사용

  ex) `Qrscanner.jsx`, `MenuCard.jsx` 등

## Code here

1. `Screens` 폴더 하위에 스크린 단위 파일을 수정하거나 구현하기

1. Screen 파일이 너무 길어지거나, 재사용 가능한 요소가 발견되는 경우 Component화 하기

1. 새로운 스크린을 만든 경우, `App.js` 수정하기

## 기타

머 써야할지 모르겠음 카톡주세양 :)
