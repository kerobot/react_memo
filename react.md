# React.js

## はじめに

前回から引き続き、書籍「React.js&Next.js超入門 第2版 (ISBN:9784798063980) 」を参考に、React の学習を少しづつ進めています。

現在は「Chapter 4 フックで状態管理しよう！」まで進み、これから「Chapter 5 Next.jsでReactをパワーアップ！」に取り掛かる予定です。

---

## 環境

* Windows 11 Pro
* PowerShell 7.1.5
* nvm (node 14.18.1 / npm 6.14.15)
* Visual Studio Code 1.16.2

---

## WebアプリとReactのざっくり違い

### Webアプリ

サーバー側での処理が主体となる。

クライアント側（Webブラウザ）からの要求（リクエスト）に応じてサーバー側で処理を開始し、データベースから取得したデータを加工してHTMLに当てはめて、出来上がったHTMLをクライアント側（Webブラウザ）へ返却（レスポンス）する。

### React

クライアント側（Webブラウザ）での処理が主体となる。

クライアント側（Webブラウザ）からの要求（リクエスト）に応じて index.html を返却（レスポンス）する。以降は、index.html を起点としてスタイルシートやコンポーネントを読み込み、UIの描画（HTMLの作成）をすべてWebブラウザ側のJavaScriptで行う。表示するデータはその都度、REST API などで問い合わせる。

---

## 学習したことの整理

コンポーネント (Component) を組み合わせて UI を描画し、属性 (Props)やステート (State) やコンテキスト (Context) でデータを受け渡す。  
クラスコンポーネントにしかない機能を関数コンポーネントで利用するにはフック (Hooks) を用いる。

React を使うことによるメリットは、ページのリロードはなくエレメント単位で更新（描画）を行うため、「超動的コンテンツを作りやすい」ということだと理解した。  
これは、コンポーネントを組み合わせて作るため、ページ構成の変更や拡張が行いやすいということにもなる。  

### コンポーネント

UI の一部分となるビュー (View) を切り出したもので、React により画面に表示される部品のこと。  
コードを含むこともでき、プログラムとして再利用できる。

```javascript
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>React</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" crossorigin="anonymous">
        <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    </head>
    <body>
        <h1 class="bg-primary text-white display-4">React</h1>  
        <div class="container mt-4">
            <div id="root">wait...</div>
        </div>
        <script type="text/babel">
            let dom = document.querySelector('#root');
            let msg ="React component page.";
            // コンポーネント
            function Welcome(props) {
                return <div className="alert alert-primary">
                    <p className="h4">Hello React!!</p>
                </div>
            }
            // 表示するJSX
            let el = (
                <div>
                    <h5 class="mb-4">{msg}</h5>
                    <Welcome /> ← コンポーネントの組み込み
                </div>
            );
            ReactDOM.render(el, dom);
        </script>
    </body>
</html>
```

### 関数コンポーネント

関数コンポーネントは JSX を返却するシンプルな JavaScript 関数

```javascript
function Sample(props) {
    return <div>
        <p className="h4">{props.msg}</p>
    </div>
}
```

```javascript
<script type="text/babel">
    let dom = document.querySelectoe('#root');
    let el = (
      <Sample msg="Hello!" />
    );
    ReactDOM.render(el. dom);
</script>
```

### クラスコンポーネント

クラスコンポーネントは React.Component を継承する JavaScript クラス

```javascript
class Sample ectends React.Component {
  msg = "";
  constructor(props) {
    super(props);
    this.msg = props.msg;
  }
  render() {
    return <div>
      <p className="h4">{msg}</p>
    </div>
  }
}
```

```javascript
<script type="text/babel">
    let dom = document.querySelectoe('#root');
    let el = (
      <Sample msg="Hello!" />
    );
    ReactDOM.render(el. dom);
</script>
```

### 属性（Props）

親コンポーネントから子コンポーネントへ渡すデータのこと  
子コンポーネント側で更新することはできない  
"文字列"や{数値やオブジェクト}を渡すことができる

### ステート (State)

子のコンポーネントの内部で管理する状態のこと  
親コンポーネント側から直接参照や更新することはできない  
state が更新されると、その state を持つコンポーネントが再描画される（重要）  
その結果、そこから呼ばれている子コンポーネントも再描画される

```javascript
import { Component } from 'react';
import './App.css';

class App extends Component {
  // コンストラクタ
  constructor(props) {
    super(props);
    // コンポーネントに渡された属性の利用
    this.title = props.title;
    this.message = props.message;
    // ステートに初期値を設定する
    this.state = {
      counter: 0,
      message: "start",
      flag: true
    };
    // doAction内でthis参照するため、このオブジェクトのthisを束縛する
    this.doAction = this.doAction.bind(this);
  }

  // クリック時に呼び出すアクション
  doAction(event) {
    this.setState({
      counter: this.state.counter + 1,
      message: this.state.counter,
      flag: !this.state.flag
    })
  }

  // 描画
  render() {
    return (
      <div>
        <h1 className="bg-primary text-white display-4">React</h1>
        <div className="container">
          <p className="subtitle">{this.title}</p>
          <p className="alert alert-warning">{this.message}</p>

          {this.state.flag ?
            <div className="alert alert-primary text-right">
              <p className="h5">count: {this.state.message}</p>
            </div>
          :
            <div className="alert alert-primary text-left">
              <p className="h5">{this.state.message}です。</p>
            </div>
          }

          <div className="text-center">
            <button className="btn btn-primary" onClick={this.doAction}>Click</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App title="App Sample" message="This is App Component!" />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
```

### フック (Hooks)

React の便利な機能を関数で利用できるようにする（副作用を差し込む）ヘルパー関数群  
useState や useEffect や useContext もフック

* フックを呼び出すのはトップレベルのみ（条件分岐やループの中はだめ）
* フックを呼び出すのは React の関数内のみ

### コンテキスト (Context)

プロパティとして下位に渡すのではなく、コンポーネントツリー内でデータを渡す方法  
状態や状態を変更するメソッドをアプリケーション全体で共通して利用できるようになる  
Context.Provider で値を渡し、Contect.Consumer で値を受け取る

```javascript
import React, { Component } from 'react'
import './App.css'

let data = {title:'React-Context', 
  message:'this is sample message.'}

const SampleContext = React.createContext(data)

class App extends Component {
  newdata = {title:'新しいタイトル', 
    message:'これは新しいメッセージです。'}

    render(){
    return <div>
      <h1 className="bg-primary text-white display-4">React</h1>
      <div className="container">
      <Title />
        <Message />
        <hr />
        <SampleContext.Provider value={this.newdata}>
          <Title />
          <Message />
        </SampleContext.Provider>
        <hr />
        <Title />
        <Message />
      </div>
    </div>
  }
}

class Title extends Component {
  static contextType = SampleContext

  render(){
    return (
      <div className="card p-2 my-3">
        <h2>{this.context.title}</h2>
      </div>
    )
  }
}

class Message extends Component {
  static contextType = SampleContext

  render(){
    return (
      <div className="alert alert-primary">
        <p>{this.context.message}</p>
      </div>
    )
  }
}

export default App
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
```

---

## 簡易メモアプリを作る

### プロジェクトの作成

```powershell
> nvm install 14.18.1
> nvm use 14.18.1
> node --version
> npm --version
> npx create-react-app react_memo
> cd react_memo
```

### プロジェクトの概要

* アクセスすると index.html が読み込まれる。
* index.html を読み込む際に、index.js が読み込まれて実行される。
* index.js のなかで App コンポーネントが読み込まれて表示される。
* App コンポーネントの MemoPage コンポーネントが簡易メモアプリの実装。

### index.html

Reactの表示を組み込むためのタグ \<div id="root">\</div> を配置

### index.js

App コンポーネントを\<div id="root">\</div>に組み込む

### App.js + App.css

App コンポーネントの本体

### memo/MemoPage.js

```javascript
import usePersist from '../Persist';
import Memo from './Memo';
import AddForm from './AddForm';
import FindForm from './FindForm';
import DelForm from './DelForm';

// メモページコンポーネント
function MemoPage() {
    // モード
    const [mode, setMode] = usePersist('mode', 'default');

    // JSXを返却
    return (
        <div>
            <h5 className="my-3">mode: {mode}</h5>
            <div className="alert alert-primary pb-0">
                {/* 追加フォーム */}
                <AddForm />
                {/* 検索フォーム */}
                <FindForm />
                {/* 削除フォーム */}
                <DelForm />
            </div>
            {/* メモ */}
            <Memo />
        </div>
    );
}

export default MemoPage;
```

### memo/AddForm.js

```javascript
import React, { useState, useEffect } from 'react';
import usePersist from '../Persist';

// 追加フォームコンポーネント
function AddForm(props) {
    // メモ
    const [memo, setMemo] = usePersist("memo", []);
    // メモのメッセージ
    const [message, setMessage] = useState('');

    // メッセージを変更した際に呼び出される関数
    const doChange = (e) => {
        // message ステートを更新
        setMessage(e.target.value);
    };

    // submit した際に呼び出される関数
    const doAction = (e) => {
        // message と 現在日時 を格納
        const data = {
            message: message,
            created: new Date()
        };
        // memo 配列に要素を追加
        memo.unshift(data);
        // memo ステートを更新
        setMemo(memo);
        // message ステートを更新（初期化）
        setMessage('');
    };

    // メッセージを登録するコンポーネントのJSXを返却
    return (
        <form onSubmit={doAction} action="">
            <div className="form-group row">
                <input type="text" className="form-control-sm col" 
                 onChange={doChange} value={message} required />
                <input type="submit" value="Add" 
                 className="btn btn-primary btn-sm col-2" />
            </div>
        </form>
    );
}

export default AddForm;
```

### memo/FindForm.js

```javascript
import React, { useState, useEffect } from 'react';
import usePersist from '../Persist';

// 検索フォームコンポーネント
function FindForm(props) {
    // メモ
    const [memo, setMemo] = usePersist("memo", []);
    // 検索したメモ
    const [fmemo, setFMemo] = usePersist("findMemo", []);
    // 検索文字列
    const [message, setMessage] = useState('');
    // モード
    const [mode, setMode] = usePersist("mode", 'find');

    // 検索文字列を変更した際に呼び出される関数
    const doChange = (e) => {
        // message ステートを更新（検索文字列を設定）
        setMessage(e.target.value);
    }

    // submit した際に呼び出される関数
    const doAction = (e) => {
        // 検索文字列が未入力であればモードをリセット
        if (message == '') {
            // mode ステートを更新
            setMode('default');
            return;
        };
        // 指定した検索文字列を含むメッセージを抽出
        let res = memo.filter((item, key) => {
            return item.message.includes(message);
        });
        // fmemo ステートを更新（検索結果を設定）
        setFMemo(res);
        // mode ステートを更新
        setMode('find');
        // message ステートを更新（検索文字列を初期化）
        setMessage('');
    }

    // メモを検索するコンポーネントのJSXを返却
    return (
        <form onSubmit={doAction}>
            <div className="form-group row">
                <input type="text" onChange={doChange} 
                 value={message} className="form-control-sm col" />
                <input type="submit" value="Find" 
                 className="btn btn-primary btn-sm col-2" />
            </div>
        </form>
    );
}

export default FindForm;
```

### memo/DelForm.js

```javascript
import React, { useState, useEffect } from 'react';
import usePersist from '../Persist';

// 削除フォームコンポーネント
function DelForm(props) {
    // メモ
    const [memo, setMemo] = usePersist("memo", []);
    // 削除するメッセージの番号
    const [num, setNum] = useState(0);

    // メッセージの選択を切り替えた際に呼び出される関数
    const doChange = (e) => {
        // num ステートを更新（削除対象のメッセージの番号を設定）
        setNum(e.target.value);
    };

    // submit した際に呼び出される関数
    const doAction = (e) => {
        // 削除対象のメッセージの番号以外のメッセージを抽出
        let res = memo.filter((item, key)=> {
            return key != num;
        });
        // memo ステートを更新（削除対象のメッセージの番号以外のメッセージを更新）
        setMemo(res);
        // num ステートを更新（削除対象のメッセージの番号を初期化）
        setNum(0);
    };

    // メモを option タグに展開
    let items = memo.map((value, key) => (
        <option key={key} value={key}>
            {value.message.substring(0, 10)}
        </option>
    ));

    // メッセージを削除するコンポーネントのJSXを返却
    return (
        <form onSubmit={doAction}>
            <div className="form-group row">
                <select onChange={doChange} className="form-control-sm col" defaultValue="-1" >
                    {items}
                </select>
                <input type="submit" value="Del" className="btn btn-primary btn-sm col-2" />
            </div>
        </form>
    );
}

export default DelForm;
```

### memo/Memo.js

```javascript
import React, { useState, useEffect } from 'react';
import usePersist from '../Persist';
import Item from './Item';

// メモコンポーネント
function Memo(props) {
    // メモ
    const [memo, setMemo] = usePersist("memo", []);
    // 検索したメモ
    const [fmemo, setFMemo] = usePersist("findMemo", []);
    // モード
    const [mode, setMode] = usePersist("mode", "default");

    // メモデータ
    let data = [];
    // モードに応じて表示する内容を切り替える
    switch (mode){
        case 'default':
            data = memo.map((value,key)=>(
                <Item key={value.message} value={value} index={key + 1} />
            ));
            setMode('deafult');
            break;
        case 'find':
            data = fmemo.map((value,key)=>(
                <Item key={value.message} value={value} index={key + 1}/>
            ));
            break;
        default:
            data = memo.map((value,key)=>(
                <Item key={value.message} value={value} index={key + 1} />
            ));
    }

    // JSXを返却
    return (
        <table className="table mt-4">
            <tbody>{data}</tbody>
        </table>
    );
}

export default Memo;
```

### memo/Item.js

```javascript
import React, { useState, useEffect } from 'react';

// アイテムコンポーネント
function Item(props) {
    // テーブルヘッダ列スタイル
    const th = {
        width: "100px"
    };
    // テーブル列スタイル
    const td = {
        textAlign: "right",
        width: "150px"
    };
    // 属性として渡された登録日をもとにMM/DD HH:MM形式の文字列を作成
    let d = new Date(Date.parse(props.value.created));
    let f = d.getMonth() + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
    // JSXを返却
    return (
        <tr>
            {/* 属性として渡されたインデックス */}
            <th style={th}>No, {props.index}</th>
            {/* 属性として渡されたメッセージ */}
            <td>{props.value.message}</td>
            {/* 生成した日時文字列 */}
            <td style={td}>{f}</td>
        </tr>
    );
}

export default Item;
```

### Persist.js

```javascript
import React, { useState } from 'react';

function usePersist(_key, _value) {
    const key = "hook:" + _key;

    const value = () => {
        try {
            // ローカルストレージから値を取り出す
            const item = window.localStorage.getItem(key);
            // 取り出せなければ初期値を返却
            return item ? JSON.parse(item) : _value;
        } catch (err) {
            console.log(err);
            return _value;
        }
    };

    const setValue = (_value) => {
        try {
            // savedValueステートに値を設定
            setSavedValue(_value);
            // ローカルストレージへ値を保管
            window.localStorage.setItem(key, JSON.stringify(_value));
        } catch (err) {
            console.log(err);
        }
    };

    // valueを用いて savedValueステートの値を取り出す
    const [savedValue, setSavedValue] = useState(value);
    // savedValueステートと、ローカルストレージに保管する関数を返却
    return [savedValue, setValue];
}

export default usePersist;
```

### プロジェクトの実行

```powershell
> nvm install 14.18.1
> nvm use 14.18.1
> node --version
> npm --version
> git clone https://github.com/kerobot/react_memo.git react_memo
> cd react_memo
> npm install
> npm audit fix
> npm start
```
