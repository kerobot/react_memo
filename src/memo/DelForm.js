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
