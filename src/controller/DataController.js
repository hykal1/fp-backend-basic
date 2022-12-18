const DataList = require('../data/DataList');

// 1. API dapat menyimpan catatan
function createListData(req, res) {
    const {title, body} = req.body;
    const id = DataList[DataList.length - 1].id + 1;
    const time = new Date().toISOString();

    if (body && title){
        DataList.push({id: id, title: title, body: body, createdAt: time, updatedAt: time});
        res.status(200).json({
            "status": "success",
            "message": "catatan berhasil ditambahkan",
            "data": {
                "id": id
            }
        });
    } else {
        res.status(404).json({
            "status":"fail",
            "message":"title atau body tidak di input"
        });
    }
}

// 2. API dapat menampilkan seluruh catatan
function getAllListData(req, res) {
    res.status(200).json({
        "status":"success",
        "data":DataList
    });
}

// 3. API dapat menampilkan detail catatan
function getDataById(req, res) {
    const { id } = req.params;
    const data = DataList.filter((data, index) => {
        return data.id === Number(id);
    })

    if (data.length !== 0) {
        res.status(200).json({
            "status":"success",
            "data": data
        });
    } else {
        res.status(404).json({
            "status":"fail",
            "data":"catatan tidak ditemukan"
        });
    }
}

// 4. API dapat mengubah catatan
function updateListData(req, res) {
    const { id } = req.params;
    const { title, body } = req.body;
    const time = new Date().toISOString();

    if (body && title){
        const DataSelected = DataList.filter((data, index) => {
            return data.id === Number(id);
        })
        
        const index = DataList.findIndex(item => item.id == id);

        DataList[index]={id: id, title: title, body: body, createdAt: DataSelected[0].createdAt, updatedAt: time};
        res.status(200).json({
            "status": "success",
            "message": "Catatan berhasil diperbarui",
            "data": {
                "id": id
            }
        });
    } else {
        res.status(404).json({
            "status":"fail",
            "message":"title atau body tidak di input"
        });
    }
}

// 5. API dapat menghapus catatan
function deleteListData(req, res) {
    const { id } = req.params;
    const index = DataList.findIndex(item => item.id == id);

    DataList.splice(index, 1);
    res.status(200).json({
        "status": "success",
        "message": "Catatan berhasil dihapus"
    })
}

module.exports = {
    createListData,
    getAllListData,
    getDataById,
    updateListData,
    deleteListData
}