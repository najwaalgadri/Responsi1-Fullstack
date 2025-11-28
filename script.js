$(document).ready(function() {
    let data = JSON.parse(localStorage.getItem('hotelData')) || [];
    let editIndex = -1;
    let deleteIndex = -1;

    function renderTable() {
        $('#tableBody').empty();
        data.forEach((item, index) => {
            $('#tableBody').append(`
                <tr>
                    <td>${item.id}</td>
                    <td>${item.namaKamar}</td>
                    <td>${item.tipeKamar}</td>
                    <td>${item.harga}</td>
                    <td>${item.status}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Hapus</button>
                    </td>
                </tr>
            `);
        });
    }

    $('#addForm').on('submit', function(e) {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            namaKamar: $('#namaKamar').val(),
            tipeKamar: $('#tipeKamar').val(),
            harga: $('#harga').val(),
            status: $('#status').val()
        };
        data.push(newItem);
        localStorage.setItem('hotelData', JSON.stringify(data));
        renderTable();
        $('#addForm')[0].reset();
    });

    $(document).on('click', '.edit-btn', function() {
        editIndex = $(this).data('index');
        const item = data[editIndex];
        $('#editId').val(item.id);
        $('#editNamaKamar').val(item.namaKamar);
        $('#editTipeKamar').val(item.tipeKamar);
        $('#editHarga').val(item.harga);
        $('#editStatus').val(item.status);
        $('#editModal').modal('show');
    });

    $('#editForm').on('submit', function(e) {
        e.preventDefault();
        data[editIndex] = {
            id: $('#editId').val(),
            namaKamar: $('#editNamaKamar').val(),
            tipeKamar: $('#editTipeKamar').val(),
            harga: $('#editHarga').val(),
            status: $('#editStatus').val()
        };
        localStorage.setItem('hotelData', JSON.stringify(data));
        renderTable();
        $('#editModal').modal('hide');
    });

    $(document).on('click', '.delete-btn', function() {
        deleteIndex = $(this).data('index');
        $('#deleteModal').modal('show');
    });

    $('#confirmDelete').on('click', function() {
        data.splice(deleteIndex, 1);
        localStorage.setItem('hotelData', JSON.stringify(data));
        renderTable();
        $('#deleteModal').modal('hide');
    });

    $('#toggleSidebar').on('click', function() {
        $('#sidebar').toggleClass('show');
    });

    $('.sidebar .nav-link').on('click', function() {
        if ($('#sidebar').hasClass('show')) {
            $('#sidebar').removeClass('show');
        }
    });

    renderTable();
});