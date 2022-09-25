import { useState, useEffect } from 'react';
import styles from './WordList.module.css';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { wordListAsync, deleteWordAsync, getWordList, saveWordJsonAsync } from '../redux/reducer/WordSlice'

export default function WordList() {
    const [wordJson, setWordJson] = useState()
    // const rootWordList = useAppSelector(getWordList);
    const worldList = useAppSelector(getWordList);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(wordListAsync())
    }, [dispatch])
    function handleDelete(word: any) {
        dispatch(deleteWordAsync(word)).then(() => {
            dispatch(wordListAsync())
        })

    }
    function handleWordChange(e: any) {
        setWordJson(e.target.value)
    }

    function handleSaveTag() {
        dispatch(saveWordJsonAsync(wordJson)).then(() => {
            dispatch(wordListAsync())
        })
    }

    return (
        <div className={styles.wrapper}>
            <textarea onChange={handleWordChange}></textarea>
            <button onClick={handleSaveTag}>保存标签</button>
            <div>Total:{worldList.length}</div>
            <table>
                <tbody>{worldList.map((v: any, i) => <tr key={i}>
                    <td>{v.rootWord}</td>
                    <td>{v.word}</td>
                    <td>{v.chinese}</td>
                    <td>{v.count}</td>
                    <td><button onClick={() => handleDelete(v.word)}>删除</button></td>
                </tr>)}</tbody>
            </table>

        </div>)
}
