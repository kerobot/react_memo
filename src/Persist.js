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
