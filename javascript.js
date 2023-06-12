
const popup = "<div class='popup'></div>"
$(document).ready(function(){
    const body = $('body')
    const frm = `
        <div class="frm">
            <div class="frm-title">
                <span>Student Form</span>
                <i class="fas fa-times" id="btn-close"></i>
            </div>
            <div class="frm-body">
                <label for="">ID</label>
                <input type="text" name="txt-id" readonly id="txt-id" class="frm-control">
                <label for="">Name</label>
                <input type="text" name="txt-name" id="txt-name" class="frm-control">
                <label for="">Price</label>
                <input type="text" name="txt-price" id="txt-price" class="frm-control">
            </div>
            <div class="footer">
                <div class="btnsave">
                    Save Data
                </div>
                <div class="Edit">
                    Edit Data
                </div>
            </div>
        </div>
    `
    $('.btnadd').click(function(){
        body.append(popup)
        var autoID = $('#addtr').find('tr')
        $('.popup').append(frm)
        $('body').find('#txt-id').val(autoID.length - 1)
        $('.popup').find('.Edit').hide()
    })
    body.on('click', '.frm #btn-close', function(){
        $('.popup').remove()
    })
    body.on('click', '.frm .btnsave', function(){
        const Parent = $(this).parents('.frm')
        const id = Parent.find('#txt-id')
        const name = Parent.find('#txt-name')
        const price = Parent.find('#txt-price')
        var autoID = 0
        if(name.val() == ""){
            alert("Please input name")
            name.focus()
            return;
        }
        if(price.val() == ""){
            alert("Please input price")
            price.focus()
            return;
        }
        if($.isNumeric(price.val()) == false){
            alert("Please input number")
            price.focus()
            return;
        }
        var ID = $('#addtr').find('tr').length
        tr = `
            <tr>
                <td>${id.val()}</td>
                <td>${name.val()}</td>
                <td>${price.val()}</td>
                <td>${`<input type="button" value="Edit" class="btnEdit">`}</td>
            </tr>
        `
        // $('#addtr').append(tr)
        $('#addtr').find('tr.total').before(tr)
        body.find('#txt-id').val($('#addtr').find('tr').length - 1)
        getTotal()
        name.val("")
        price.val("")
        name.focus()
    })
    function getTotal(){
        var countTr = $('#addtr').find('tr').length
        var Total = 0
        for(i = 1; i < countTr-1; i++){
            Total += parseFloat($('#addtr').find('tr:eq('+ i +') td:eq(2)').text())
        }
        $('#addtr').find('tr.total td:eq(1)').text(Total)
    }
    //Get edit data when click edit
    var indTr;
    $('body').on('click','#addtr .btnEdit', function(){
        var eThis = $(this)
        var tr = eThis.parents('tr')
        var id = tr.find('td:eq(0)').text()
        var name = tr.find('td:eq(1)').text()
        var price = parseFloat(tr.find('td:eq(2)').text())
        indTr = tr.index()
        $('body').append(popup)
        $('.popup').append(frm)
        $('.popup').find('.btnsave').hide()
        $('.popup').find('#txt-id').val(id)
        $('.popup').find('#txt-name').val(name)
        $('.popup').find('#txt-price').val(price)
    })
    //Update data
    $('body').on('click', '.Edit', function(){
        var id = $('body').find('.frm #txt-id').val()
        var name = $('body').find('.frm #txt-name').val()
        var price = $('body').find('.frm #txt-price').val()
        $('#addtr').find('tr:eq('+ indTr +') td:eq(0)').text(id)
        $('#addtr').find('tr:eq('+ indTr +') td:eq(1)').text(name)
        $('#addtr').find('tr:eq('+ indTr +') td:eq(2)').text(price)
        $('#addtr').find('tr:eq('+ indTr +')').addClass('active')
        $('.popup').remove()
    })
})