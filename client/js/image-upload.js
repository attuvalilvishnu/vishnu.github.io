(() => {
    const $input = document.getElementById('input');
    const $img = document.getElementById('img');
    const $preview = document.getElementById('preview');
    const previewCtr = $preview.getContext('2d');
    // const fileReader = new FileReader();
    // const image = new Image();

    const worker = new Worker('js/web-worker.js');

    worker.addEventListener('message', (ev) => {
        if (ev.data.type === 'imageProcessing') {
            const imageData = ev.data.imageData;
            previewCtr.putImageData(imageData, 0, 0);
        }

    });

    function applyFilter(bitmap) {
        const width = $preview.width;
        const height = $preview.height;
        const imageData = previewCtr.getImageData(0, 0, width, height);
        const payload = { imageData, type: 'imageProcessing' }
        worker.postMessage(payload,[imageData.data.buffer]);
    }

    /*image.addEventListener('load', (eve) => {
        console.log(eve);
        $img.appendChild(image);
        $preview.width = image.width;
        $preview.height = image.height;
        previewCtr.drawImage(image, 0, 0);
        applyFilter();
    });*/

    /* fileReader.addEventListener('load', (eve) => {
         image.src = eve.target.result;
     });*/

    $input.addEventListener('change', async (eve) => {
        const file = eve.target.files[0];
        // fileReader.readAsDataURL(file);
        const bitmap = await createImageBitmap(file);
        $preview.width = bitmap.width;
        $preview.height = bitmap.height;
        previewCtr.drawImage(bitmap, 0, 0);
        applyFilter();

    });


})();