---
title: "Network & Protocols"
description: "TCP/IP 메시지 처리"
---
## 개요

TCP는 바이트 스트림이므로 한 번의 Read가 한 메시지와 일치하지 않습니다. 길이 헤더 또는 구분자 규격에 맞춰 메시지를 조립합니다.

## 프레이밍

```csharp
int count = await stream.ReadAsync(buffer.AsMemory(), token);
if (count == 0) return; // Peer closed the connection
// Append received bytes to a bounded framing buffer.
```

## 실무 적용 및 테스트

최대 프레임 크기, 타임아웃, 재연결 백오프를 정의하고 부분 수신 및 연속 프레임을 테스트합니다.

## 다음 학습

[전체 기술 문서](/portal/docs/)
