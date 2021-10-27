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
