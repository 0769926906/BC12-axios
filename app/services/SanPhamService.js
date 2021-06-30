function SanPhamService() {
    this.layDSSP = function() {
        //Get: lấy dữ liệu từ sever
        // axios trả về 1 promise
        return axios({
            url: 'http://60d5dbf8943aa60017768c54.mockapi.io/products', 
            method: 'GET',
        });
    };

    this.themSP = function(sp) {
        //POST: thêm mới dữ liệu
        // data: dữ liệu cần thêm vào cơ sở dữ liệu
        return axios({
        url: 'https://60d5dbf8943aa60017768c54.mockapi.io/products',
        method: 'POST',
        data: sp,
    });
};
this.xoaSP = function(id){
    return axios({
        url: 'https://60d5dbf8943aa60017768c54.mockapi.io/products/${id}',
        method: 'DELETE',
        })
    }
    this.xemSP = function(id){
        //Get: lấy data của 1 sp dựa vào id
        return axios ({
            url: 'https://60d5dbf8943aa60017768c54.mockapi.io/products/${id}',
            method: 'GET',
        })
    }
    this.capNhatSP = function(id, sp){
        return axios({
            url: 'https://60d5dbf8943aa60017768c54.mockapi.io/products/${id}',
            method: 'PUT',
            data: sp
        })
    }
    this.timKiemSP = function(dssp,chuoiTK){
        return dssp.filter(function(sp){
            return sp.tenSP.toLowerCase().indexOf(chuoiTK.toLowerCase()) !== -1;
        })
    }
}