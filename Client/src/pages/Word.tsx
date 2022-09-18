import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import styles from './Word.module.css';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { getRootWordList, rootWordListAsync, createTagAsync, getTagWordList } from '../redux/reducer/WordSlice'
import { isEmpty } from '../utils';
import WordList from './WordList'

export default function Word() {
    const [selectWord, setSelectWord] = useState<string[]>([])
    const rootWordList = useAppSelector(getRootWordList);
    const tagWorldList = useAppSelector(getTagWordList);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(rootWordListAsync())
    }, [dispatch])
    function handleSelectWord(word: string) {
        const index = selectWord.indexOf(word)
        let newState = null
        if (index < 0) {
            newState = [...selectWord, word]
        } else {
            newState = selectWord.filter(item => item != word)

        }
        setSelectWord(newState)

    }
    function handleCreateTag() {
        dispatch(createTagAsync(selectWord))
    }
    return (
        <div>
        <div className={styles.wrapper}>
            
            <div className={styles.rootWordWrapper}> {rootWordList.map((rootWord: any, index: number) =>
                <div
                    key={index}
                    onClick={() => handleSelectWord(rootWord)}
                    className={`${styles.rootWord} ${selectWord.includes(rootWord) ? styles.selectRootWord : styles.unSelectRootWord}`}
                >
                    #{rootWord}
                </div>)}
            </div>
            <button onClick={handleCreateTag}>生成标签</button>
            {!isEmpty(tagWorldList) ? <div className={styles.tagWrapper}>{
                tagWorldList.map((item: any, index) => <span key={index}>{` #${item.word}`}</span>)
            }</div> : null
            }
            </div>
            <div className={styles.partingLine}/>
            <div><WordList></WordList></div>
        </div>)
}
