export const statuses = [
 {
  "code": 100,
  "name": "Continue",
  "description": "要求本体を送信してよい",
  "example": "Expect: 100-continue の確認"
 },
 {
  "code": 101,
  "name": "Switching Protocols",
  "description": "プロトコルを切り替える",
  "example": "WebSocketへのアップグレード"
 },
 {
  "code": 102,
  "name": "Processing",
  "description": "処理を継続中（WebDAV）",
  "example": "時間のかかるWebDAV操作"
 },
 {
  "code": 103,
  "name": "Early Hints",
  "description": "最終応答より前のヒント",
  "example": "Linkヘッダーで先読みを通知"
 },
 {
  "code": 200,
  "name": "OK",
  "description": "要求が成功",
  "example": "GETでページを取得"
 },
 {
  "code": 201,
  "name": "Created",
  "description": "リソースを作成",
  "example": "POST後にLocationで作成先を通知"
 },
 {
  "code": 202,
  "name": "Accepted",
  "description": "要求を受理したが未完了",
  "example": "非同期ジョブの受付"
 },
 {
  "code": 203,
  "name": "Non-Authoritative Information",
  "description": "中継で変換された情報",
  "example": "プロキシが応答を変換"
 },
 {
  "code": 204,
  "name": "No Content",
  "description": "成功したが応答本体なし",
  "example": "DELETEの成功"
 },
 {
  "code": 205,
  "name": "Reset Content",
  "description": "入力表示のリセットを指示",
  "example": "フォーム送信後の初期化"
 },
 {
  "code": 206,
  "name": "Partial Content",
  "description": "部分的な内容",
  "example": "Rangeで動画の一部を取得"
 },
 {
  "code": 207,
  "name": "Multi-Status",
  "description": "複数の操作結果（WebDAV）",
  "example": "複数ファイルの結果をXMLで返す"
 },
 {
  "code": 208,
  "name": "Already Reported",
  "description": "既に報告済み（WebDAV）",
  "example": "同一バインディングの重複を省略"
 },
 {
  "code": 226,
  "name": "IM Used",
  "description": "インスタンス操作適用済み",
  "example": "差分エンコーディングで返す"
 },
 {
  "code": 300,
  "name": "Multiple Choices",
  "description": "複数の選択肢がある",
  "example": "複数表現から選択"
 },
 {
  "code": 301,
  "name": "Moved Permanently",
  "description": "恒久的な移転",
  "example": "サイトURLの恒久変更"
 },
 {
  "code": 302,
  "name": "Found",
  "description": "一時的に別の場所",
  "example": "一時的なリダイレクト"
 },
 {
  "code": 303,
  "name": "See Other",
  "description": "別のURIをGETで参照",
  "example": "POST後の確認ページ"
 },
 {
  "code": 304,
  "name": "Not Modified",
  "description": "キャッシュから変更なし",
  "example": "条件付きGETで再利用"
 },
 {
  "code": 305,
  "name": "Use Proxy",
  "description": "プロキシ指定（非推奨）",
  "example": "新規実装では使わない"
 },
 {
  "code": 307,
  "name": "Temporary Redirect",
  "description": "メソッドを維持する一時転送",
  "example": "POSTを維持して転送"
 },
 {
  "code": 308,
  "name": "Permanent Redirect",
  "description": "メソッドを維持する恒久転送",
  "example": "POSTを維持するURL変更"
 },
 {
  "code": 400,
  "name": "Bad Request",
  "description": "要求の構文などが不正",
  "example": "壊れたJSONを受信"
 },
 {
  "code": 401,
  "name": "Unauthorized",
  "description": "認証が必要",
  "example": "WWW-Authenticateで認証方式を通知"
 },
 {
  "code": 402,
  "name": "Payment Required",
  "description": "将来の利用のため予約",
  "example": "一般的な決済処理の標準用途は未定義"
 },
 {
  "code": 403,
  "name": "Forbidden",
  "description": "要求を拒否",
  "example": "認証済みでも権限不足"
 },
 {
  "code": 404,
  "name": "Not Found",
  "description": "対象が見つかりません",
  "example": "存在しないパス"
 },
 {
  "code": 405,
  "name": "Method Not Allowed",
  "description": "メソッドが許可されない",
  "example": "Allowで利用可能メソッドを通知"
 },
 {
  "code": 406,
  "name": "Not Acceptable",
  "description": "受け入れ可能な表現がない",
  "example": "Acceptに合う形式がない"
 },
 {
  "code": 407,
  "name": "Proxy Authentication Required",
  "description": "プロキシ認証が必要",
  "example": "Proxy-Authenticateで通知"
 },
 {
  "code": 408,
  "name": "Request Timeout",
  "description": "要求の受信がタイムアウト",
  "example": "要求送信が遅すぎる"
 },
 {
  "code": 409,
  "name": "Conflict",
  "description": "現在の状態と競合",
  "example": "編集競合"
 },
 {
  "code": 410,
  "name": "Gone",
  "description": "対象は恒久的に削除済み",
  "example": "廃止したAPI"
 },
 {
  "code": 411,
  "name": "Length Required",
  "description": "Content-Lengthが必要",
  "example": "長さのない要求を拒否"
 },
 {
  "code": 412,
  "name": "Precondition Failed",
  "description": "前提条件が不成立",
  "example": "If-MatchのETagが古い"
 },
 {
  "code": 413,
  "name": "Content Too Large",
  "description": "要求内容が大きすぎる",
  "example": "アップロード上限超過"
 },
 {
  "code": 414,
  "name": "URI Too Long",
  "description": "URIが長すぎる",
  "example": "過長なクエリ文字列"
 },
 {
  "code": 415,
  "name": "Unsupported Media Type",
  "description": "未対応のメディア形式",
  "example": "JSON専用APIに別形式を送信"
 },
 {
  "code": 416,
  "name": "Range Not Satisfiable",
  "description": "範囲を満たせない",
  "example": "ファイル末尾を超えるRange"
 },
 {
  "code": 417,
  "name": "Expectation Failed",
  "description": "Expectを満たせない",
  "example": "100-continue要求の拒否"
 },
 {
  "code": 421,
  "name": "Misdirected Request",
  "description": "要求先が不適切",
  "example": "別のオリジン用接続への要求"
 },
 {
  "code": 422,
  "name": "Unprocessable Content",
  "description": "内容の意味を処理できない",
  "example": "妥当なJSONだが業務検証に失敗"
 },
 {
  "code": 423,
  "name": "Locked",
  "description": "対象がロック中（WebDAV）",
  "example": "編集中のファイル"
 },
 {
  "code": 424,
  "name": "Failed Dependency",
  "description": "依存操作が失敗（WebDAV）",
  "example": "前提操作の失敗に伴う失敗"
 },
 {
  "code": 425,
  "name": "Too Early",
  "description": "早期データの再送リスクを拒否",
  "example": "TLS early dataの再試行を要求"
 },
 {
  "code": 426,
  "name": "Upgrade Required",
  "description": "プロトコルの更新が必要",
  "example": "Upgradeで対応方式を通知"
 },
 {
  "code": 428,
  "name": "Precondition Required",
  "description": "条件付き要求が必要",
  "example": "更新時にIf-Matchを要求"
 },
 {
  "code": 429,
  "name": "Too Many Requests",
  "description": "要求回数が多すぎる",
  "example": "Retry-Afterで再試行までの時間を通知"
 },
 {
  "code": 431,
  "name": "Request Header Fields Too Large",
  "description": "要求ヘッダーが大きすぎる",
  "example": "過大なCookie"
 },
 {
  "code": 451,
  "name": "Unavailable For Legal Reasons",
  "description": "法的理由による利用制限",
  "example": "法令に基づくアクセス制限"
 },
 {
  "code": 500,
  "name": "Internal Server Error",
  "description": "サーバー内部の予期しない問題",
  "example": "未処理の例外"
 },
 {
  "code": 501,
  "name": "Not Implemented",
  "description": "必要な機能を未実装",
  "example": "未対応のメソッド"
 },
 {
  "code": 502,
  "name": "Bad Gateway",
  "description": "上流から無効な応答",
  "example": "リバースプロキシの上流障害"
 },
 {
  "code": 503,
  "name": "Service Unavailable",
  "description": "一時的に提供不可",
  "example": "過負荷・メンテナンス"
 },
 {
  "code": 504,
  "name": "Gateway Timeout",
  "description": "上流の応答が時間切れ",
  "example": "バックエンドの応答遅延"
 },
 {
  "code": 505,
  "name": "HTTP Version Not Supported",
  "description": "HTTPバージョン非対応",
  "example": "要求のバージョンを拒否"
 },
 {
  "code": 506,
  "name": "Variant Also Negotiates",
  "description": "コンテンツ交渉の循環",
  "example": "サーバーの交渉設定ミス"
 },
 {
  "code": 507,
  "name": "Insufficient Storage",
  "description": "保存領域が不足（WebDAV）",
  "example": "ファイル保存の容量不足"
 },
 {
  "code": 508,
  "name": "Loop Detected",
  "description": "無限ループを検出（WebDAV）",
  "example": "コレクションの循環"
 },
 {
  "code": 510,
  "name": "Not Extended",
  "description": "拡張不足（廃止済み）",
  "example": "旧HTTP拡張フレームワークのコード"
 },
 {
  "code": 511,
  "name": "Network Authentication Required",
  "description": "ネットワーク認証が必要",
  "example": "公衆Wi-Fiのキャプティブポータル"
 }
] ;
export function searchStatus(query:string,group=''){const words=query.normalize('NFKC').toLowerCase().trim().split(/\s+/);return statuses.filter(x=>(!group||String(x.code)[0]===group)&&words.every(w=>`${x.code} ${x.name} ${x.description} ${x.example}`.toLowerCase().includes(w)));}
