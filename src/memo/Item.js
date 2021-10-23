import React, { useState, useEffect } from 'react';

// Item コンポーネント
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
