





var layDanhSachSP = function(){
    SanPhamService.layDSSP().then(function(result){
        //Thanh cong
        // console.log(result.data);
        // renderTable
        renderTable(result.data);
        setLocalStorage(result.data);
    }).catch(function(error){
        //that bai
        console.log(error);
    });
};

layDanhSachSP();

var themSanPham = function(){
    /**
     * lấy thông tin từ form
     */
    var tenSP = getEle('TenSP').value;
    var gia = getEle('GiaSP').value;
    var hinhAnh = getEle('HinhSP').value;
    var moTa = getEle('moTa').value; 
    /**
     * khởi tạo đối tượng sp từ lớp đối tượng SanPham
     */
    var sp = new SanPham(tenSP, gia, hinhAnh, moTa);
    /**
     * gọi api để lưu data xuống CSDL (database)
     */
    SanPhamService.themSP(sp)
        .then(function(result){
            layDanhSachSP();
        }).catch(function(error){
            console.log(error);
        });
};
getEle('btnThemSP').addEventListener('click', function(){
    // clear data trên form sau khi cập nhật
    getEle('formSP').reset();
    var modalFooter = document.querySelector('.modal-footer');
    modalFooter.innerHTML = `<button class="btn btn-success" onclick="themSanPham()">Thêm sản phẩm</button>`
});

var xoaSanPham = function(id){
    sanPhamService
    .xoaSP(id)
    .then(function(result) {
        // load lại danh sách SP sau khi xóa thành công
        alert('success');
        layDanhSachSP();
    })
    .catch(function(error){
        console.log(error);
    });
};

var capNhatSanPham = function(id){
     /**
     * lấy thông tin mới từ form
     */
      var tenSP = getEle('TenSP').value;
      var gia = getEle('GiaSP').value;
      var hinhAnh = getEle('HinhSP').value;
      var moTa = getEle('moTa').value;

      var sp = new SanPham(tenSP, gia, hinhAnh, moTa);
     /**
      * cập nhật thông tin mới xuống database
      */
     sanPhamService
     .capNhatSP(id, sp)
     .then(function(result){
         console.log(result.data);
         layDanhSachSP();
         // ẩn modal sau khi cập nhật thành công
         document.querySelector('#myModal .close').click();

     })
     .catch(function(error){
        console.log(error)
     });
};

var xemSanPham = function(id){
    sanPhamService
        .xemSP(id)
        .then(function(result){
            var sp = result.data;
            // mở modal
            getEle('btnThemSP').click();
            // $('#myModal').modal('show');

            // đổ data trả về từ sever lên form
            getEle('TenSP').value = sp.tenSP;
            getEle('GiaSP').value = sp.gia;
            getEle('HinhSP').value = sp.hinhAnh;
            getEle('moTa').value = sp.moTa;
            //thêm button cập nhật cho form
            var modalFooter = document.querySelector('.modal-footer');
            modalFooter.innerHTML = `<button class="btn btn-success" onclick="capNhatSanPham('${sp.id}')>Cập Nhật</button>`
        })
        .catch(function(error){
            console.log(error);
        });
};

function renderTable(mangSP){
    var content = '';
    mangSP.map(function(sp, index){
        content +=`
                    <tr>
                    <td>${index + 1}</td>
                    <td>${sp.tenSP}</td>
                    <td>${sp.gia}</td>
                    <td>
                    <img style="width: 80px; height: 80px" src="${sp.hinhAnh}"/>
                    </td>
                    <td>${sp.moTa}</td>
                    <td>
                    <button class="btn btn-danger" onclick="xoaSanPham('${sp.id}')">Xóa</button>
                    <button class="btn btn-success" onclick="xemSanPham('${sp.id}')>Xem</button>
                    </td>
                    </tr>
                    `;
    });
    getEle('tblDanhSachSP').innerHTML = content;
}

getEle('ipTimKiem').addEventListener('keyup', function(){
    var mangSP = getLocalStorage();
    var chuoiTK = getEle('ipTimKiem').value;

    var mangTimKiem = sanPhamService.timKiemSP(mangSP, chuoiTK);
    renderTable(mangTimKiem);
});

function setLocalStorage(dssp){
    localStorage.setItem('DSSP', JSON.stringify(dssp));
}

function getLocalStorage(){
    if (localStorage.getItem('DSSP')) {
        return JSON.parse(localStorage.getItem('DSSP'));
    }
}