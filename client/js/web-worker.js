self.addEventListener('message', (ev) => {
    if (ev.data.type === 'imageProcessing') {
        const imageData = ev.data.imageData;
        const width = imageData.width;
        const height = imageData.height;
        console.log(imageData);
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const index = (i + (j * width)) * 4;
                imageData.data[index] = imageData.data[index] * 1.2;
            }
        }
        const payload = {imageData,type:'imageProcessing'}
        self.postMessage(payload,[imageData.data.buffer]);
    }
});