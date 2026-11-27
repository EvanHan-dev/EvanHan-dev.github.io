---
title: "Database & SQL"
description: "Repository와 Dapper"
---
## 개요

SQL 실행 책임을 Repository로 분리하고 입력값은 파라미터로 전달합니다.

## 파라미터 쿼리

```csharp
var command = new CommandDefinition(
    "SELECT Name FROM Devices WHERE Id = @Id",
    new { Id = deviceId }, cancellationToken: token);
var name = await connection.QuerySingleOrDefaultAsync<string>(command);
```

## 실무 적용 및 테스트

연결 수명과 트랜잭션 경계를 명확히 하고 접속 문자열이나 자격 증명을 로그에 남기지 않습니다.

## 다음 학습

[전체 기술 문서](/portal/docs/)
