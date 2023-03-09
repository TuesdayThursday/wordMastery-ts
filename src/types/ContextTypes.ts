export interface listIdInterface {
    sentenceListId: string,
    wordListId: string
}

export interface globalMenuProps {
    changeWordId: (wordId: number) => void;
    menuOpen:number
}

export interface sentenceMenuOpenType {
    setFunc: (state: string)=>void
}