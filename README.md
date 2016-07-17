# Lambda Simple Form

HTML -> AWS Api Gateway -> AWS Lambda -> AWS RDS

# AWS Api Gateway

`context.fail`からのふりわけにはApi Gateway側で多少の加工が必要になる。

## 統合レスポンス

### HTTP ステータスの正規表現

```
.*"result":"failure".*
```

### 本文マッピングテンプレート

StringifiedされたJSON文字列を、JSONとして返す。

```
$input.path('$.errorMessage')
```

## 注意

swaggerから設定を行う場合、Lambdaのアクセス許可を確認すること(不可解なエラーが出る)。