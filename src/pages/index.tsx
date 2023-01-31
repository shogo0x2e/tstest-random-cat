import { useState } from "react";

async function fetchCatImage() {
    const jsonResult = await fetch("https://api.thecatapi.com/v1/images/search");
    const result = await jsonResult.json();
    return result[0];
}

const IndexPage = () => {
    // 猫の画像ギャラリーの添え字
    const [index, setIndex] = useState(0);
    // 猫の画像ギャラリーの URL リスト
    const [catImageUrls, setCatImageUrl] = useState(
        ["https://cdn2.thecatapi.com/images/e6f.jpg"]
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

export default IndexPage;