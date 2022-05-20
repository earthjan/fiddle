fs.readdir(source, function (err, files) {
    if (err) {
        console.log('Error finding files: ' + err)
    } else {
        files.forEach(function (filename, fileIndex) {
            console.log(filename)
            gm(source + filename).size(function (err, values) {
                if (err) {
                    console.log('Error identifying file size: ' + err)
                } else {
                    console.log(filename + ' : ' + values)
                    aspect = (values.width / values.height)
                    widths.forEach(function (width, widthIndex) {
                        height = Math.round(width / aspect)
                        console.log('resizing ' + filename + 'to ' + height + 'x' + height)
                        this.resize(width, height).write(dest + 'w' + width + '_' + filename, function (err) {
                            if (err) console.log('Error writing file: ' + err)
                        })
                    }.bind(this))
                }
            })
        })
    }
})


const readdirPromise = (source, err, files) => {
    if (err)
        return Promise.reject('Error finding files' + err);
    else
        return Promise.resolve(files)
}

const processFile = (file, fileName, fileIndex)

/*
readdir()
    .then(processFile)
    .then(size)
    .then(width)
    .catch(err => console.log(err))
*/
