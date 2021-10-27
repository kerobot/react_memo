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
