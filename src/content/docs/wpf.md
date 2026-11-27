---
title: "WPF & MVVM"
description: "UI와 통신 스레드 분리"
---
## 개요

장비 통신은 서비스에서 담당하고 화면 상태는 UI 스레드에서 갱신합니다.

## Dispatcher

```csharp
await Application.Current.Dispatcher.InvokeAsync(() =>
{
    CurrentState = snapshot;
});
```

## 실무 적용 및 테스트

snapshot은 공유 상태를 직접 참조하지 않는 불변 데이터로 구성합니다. UI 갱신 빈도를 제한하고 화면 종료 시 구독을 해제합니다.

## 다음 학습

[전체 기술 문서](/portal/docs/)
