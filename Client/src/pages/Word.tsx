import { useState, useEffect } from 'react';
import styles from './Word.module.css';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { getRootWordList, rootWordListAsync, createTagAsync, getTagWordList } from '../redux/reducer/WordSlice'
import { isEmpty } from '../utils';
import WordList from './WordList'

export default function Word() {
    const [selectWord, setSelectWord] = useState<string[]>([])
    const [tagCount, setTagCount] = useState<number>(10)
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
            newState = selectWord.filter(item => item !== word)

        }
        setSelectWord(newState)

    }
    function handleCreateTag() {
        dispatch(createTagAsync({selectWord, tagCount}))
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
            <div className={styles.stepWrapper}>
                {[5,10, 15, 20, 25, 30].map((v, i) => 
                <span className={v===tagCount ? styles.selectedStep : "" } onClick ={() => setTagCount(v)} key={i}>{v}</span>
                )}
            </div>
            <button onClick={handleCreateTag}>生成{tagCount}个标签</button>
            {!isEmpty(tagWorldList) ? <div className={styles.tagWrapper}>{
                tagWorldList.map((item: any, index) => <span key={index}>{` #${item.word}`}</span>)
            }</div> : null
            }
            </div>
            <div className={styles.partingLine}/>
            <div><WordList></WordList></div>
        </div>)
}
