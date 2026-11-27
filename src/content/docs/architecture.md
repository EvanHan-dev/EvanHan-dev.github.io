---
title: "System Architecture"
description: "계층형 설계"
---
## 개요

UI는 표시와 입력, Service는 제어 정책, Device는 장비 인터페이스를 담당합니다.

## 책임 분리

```csharp
public interface IDeviceClient
{
    Task ConnectAsync(CancellationToken token);
}
```

## 실무 적용 및 테스트

인터페이스 구현을 가짜 장비로 교체하여 장애 및 타임아웃 시나리오를 검증합니다.

## 다음 학습

[전체 기술 문서](/portal/docs/)
