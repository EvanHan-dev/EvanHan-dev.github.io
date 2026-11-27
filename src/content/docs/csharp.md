---
title: "C# & .NET"
description: "비동기 프로그래밍"
---
## 개요

I/O 작업은 비동기 API로 처리하고 종료 요청을 취소 토큰으로 전달합니다.

## Task와 CancellationToken

```csharp
using var cts = new CancellationTokenSource();
await Task.Delay(TimeSpan.FromSeconds(1), cts.Token);
```

## 실무 적용 및 테스트

취소와 통신 실패를 구분하여 기록하고, 종료 시 실행 중인 작업을 기다립니다.

## 다음 학습

[전체 기술 문서](/portal/docs/)
