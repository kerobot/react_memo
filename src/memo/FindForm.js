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
