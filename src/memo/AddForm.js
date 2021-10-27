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
