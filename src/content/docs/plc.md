---
title: "PLC Integration"
description: "Handshake 기본 설계"
---
## 개요

요청, 응답, 완료, 초기화의 의미를 PLC와 합의합니다. 아래는 학습용 개념이며 실제 장비 신호 규격은 별도로 검증해야 합니다.

## 상태 전이

```text
Idle → Request → Ack → Complete → Reset
```

## 실무 적용 및 테스트

상태별 타임아웃과 알람, 수동 복구 조건을 정의합니다. 통신 복구만으로 장비 동작을 자동 재개하지 않습니다.

## 다음 학습

[전체 기술 문서](/portal/docs/)
