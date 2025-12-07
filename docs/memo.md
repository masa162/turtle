Yellow Turtle Library (黄亀図書室)
きがめとしょしつ
を開発始めます

github　Repository: masa86/turtle
https://github.com/masa162/turtle

クロンしてあります。
/Users/nakayamamasayuki/Documents/GitHub/turtle


cloudflre
Belong2jazz@gmail.com's Account
c677241d7d66ff80103bab9f142128ab

workers / R2 / D1
を利用します


Domain: turtle.masa86.com
予定
「黄亀東洋医科大学（Yellow Turtle Oriental Medical College）」


honoのフレームワーク
ブログサイト

コンセプト、
東洋医学古典、黄帝内経の原文の朗読読解、音声朗読をメインに展開、
配信する

管理画面から記事作成、編集できる　webブラウザから
/adminなどとする
basic認証
id mn
pass 39
予定

音声CDNは自前でcloudflareに構築しているものを
自分の他のプロジェクトでも使っています、
このあたりに、寄せたり、統合することを基本考えています。

https://wavestk.pages.dev/

https://wave.be2nd.com/b1th2r0s.m4a

必要だったらアクセスしてください、
/Users/nakayamamasayuki/Documents/GitHub/wavestk


例えば、自分が運営している、医スク
isk.masa86.com
でも音声メディアの実ファイル自体は
https://wave.be2nd.com/b1th2r0s.m4a
から配信されている、イメージです。

R2のバケット自体はturtle専用に分けたほうがいいのでしょうか？
長期的に、安定堅牢に運用管理できることが理想

このあたり含めて、アドバイスお願いします。

wrangler CLI許可します。

必要だったら私に、どんどんヒアリングしてください、


# 回答
# R2バケットの構成について

＞
オプションB: 既存の共有音声CDN（wavestk）を使用（コスト効率的、一元管理）

他でも音声扱いまくるので、自分の中で
wavestkがかなり活用重要度が高い。
他、でも
isk.masa86.com
blog.masa86.com
turtle.masa86.com
でも、一元管理する方向でいきたい、
これを踏まえて、もしかしたら、
まず、wavestkの仕組みをいまのままそのまま使いつつ、整えたほうがいいかもしれない。
wavestkにごちゃまぜにupしたコンテンツは、
手元のspreadsheetとかで、感覚的に管理するのが結局はいい気がする。

将来的に、各サイトでの要求がさらに分化してきたら、フォークしていくのがいいのかもしれない

# 記事のデータ構造について 黄帝内経の記事で保存したい情報は何でしょうか？例えば：
記事タイトル、本文（markdown）
音声朗読のURL
章・節の参照情報
公開日
その他のメタデータ

↑上記でいいような気がします。
あとは

例えば
https://ctext.org/huangdi-neijing/shang-gu-tian-zhen-lun/zh
がよくできていて、

章chapterを
上古天真論＿とかで分け

そのしたのディレクトリとして、
節verseを
４つにわけていく、

これは解釈にもよるんですが、
このルールを大まかにしておくきつつ柔軟にverseを追加していくイメージでいきたい


#　管理画面の優先機能 最初のバージョンで最も重要な機能はどれですか？
記事のCRUD（作成・閲覧・編集・削除）

なくていい↓
音声ファイルのアップロード/管理
公開前のプレビュー
下書き/公開ステータス
その他

wavestkを統合的につかうことができて、
https://wave.be2nd.com/b1th2r0s.m4a
とかが発行できれば、
他ブログでは、音声を管理画面でを扱わなくていいというのが、理想です、伝わるでしょうか？言語化むずいんですが


#　デザインの方向性 医スク（isk.masa86.com）と同じようなデザインパターンで良いですか？それとも、古典医学というテーマに合わせた異なる雰囲気をご希望ですか？

UIデザインは別プロジェクトこれを踏襲したい、デザインを気に入ってる
古医術研究所
https://kampo.belong2jazz.workers.dev/

/Users/nakayamamasayuki/Documents/GitHub/kp

アクセス許可します

#　音声ファイルの運用フロー 管理画面から記事を作成する際、音声ファイルは：
上記のように、やはりwavestkに集約するのが理想