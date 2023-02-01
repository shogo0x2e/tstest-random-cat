import { useState } from "react";
import type { NextPage, GetServerSideProps } from "next";

/**
 * TheCatAPI から適当な画像の json を fetch する
 * @returns パースした json
 */
async function fetchCatImage() {
    const jsonResult = await fetch("https://api.thecatapi.com/v1/images/search");
    const result = await jsonResult.json();
    return result[0];
}

/**
 * 
 */
interface IndexPageProps {
    initialCatImageUrl: string;
}

/**
 * ページの生成
 * @param param0 getServerSideProps から取得したデータ (props) 
 * @returns 生成したページ
 */
const IndexPage: NextPage<IndexPageProps> = ({initialCatImageUrl}) => {
    // 猫の画像ギャラリーの添え字
    const [index, setIndex] = useState(0);
    // 猫の画像ギャラリーの URL リスト
    const [catImageUrls, setCatImageUrl] = useState(
        [initialCatImageUrl]
    );

    // リストの範囲内で 1 つずつ戻る
    const backToPrevious = () => {
        if (index > 0) setIndex(index - 1);
    };
    
    // リストの範囲内で 1 つずつ進む, 末尾で呼ばれたら
    // 新しく URL を fetch してくる
    const goToNext = () => {

        // 添え字が配列の末尾を指していたら
        if (index >= catImageUrls.length - 1) {
            fetchCatImage().then((jsonImage) => {
                setCatImageUrl([...catImageUrls, jsonImage.url]);
            });
        }
        setIndex(index + 1);
    }

    return (
        <>
            <img src={catImageUrls[index]}></img>
            <button onClick={backToPrevious}> Prev </button>
            <button onClick={goToNext}> Next </button>
        </>
    );
};

/**
 * ページのロード時に
 * @returns 
 */
export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
    const catImage = await fetchCatImage();
    return {
        props: {
            initialCatImageUrl: catImage.url,
        },
    };
}

export default IndexPage;