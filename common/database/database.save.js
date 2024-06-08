const save = function (db, model, COLLECTION_NAME) {
    delete model._id;

    return new Promise((resolve, reject) => {
        db.collection(COLLECTION_NAME)
            .insertOne(model)
            .then((result) => {
                console.log(result);
                console.log('저장 성공');
                resolve(result);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    })
}

module.exports = { save };