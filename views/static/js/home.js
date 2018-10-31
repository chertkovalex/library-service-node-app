$(document).ready(function() {
  //on page load keep the book list populated------------START
  $.ajax({
    url: 'books/',
    dataType: 'json'
  })
    .done(data => {
      if (data) {
        var odata = $.parseJSON(JSON.stringify(data.books));
        odata.forEach(item => {
          $('#myTable > tbody:last-child').append(getRowHtml(item));
        });
      }
    })
    .fail(err => {
      console.log('Error');
    });
  //-------------------------------------------------------END

  //on add book submit the form----------------------------START
  $('#btnSubmit').click(() => {
    $('#addBookForm').submit();
  });

  $(document).on('submit', '#addBookForm', function(event) {
    event.preventDefault();
    var $form = $(this);

    $.ajax({
      url: 'books/add',
      data: $form.serializeArray(),
      type: 'POST'
    })
      .done(data => {
        if (data) {
          var odata = $.parseJSON(JSON.stringify(data.books));
          odata.forEach(item => {
            $('#myTable > tbody:last-child').append(getRowHtml(item));
          });
          $('#addBookForm').trigger('reset');
        }
      })
      .fail(err => {
        console.log('Error');
      });
  });
  //-------------------------------------------------------END

  //on click of delete record----------------------------START
  $(document).on('click', '.btn-del-record', function(event) {
    //identify the row which we will remove from our table.
    var row = $(this)
      .parent()
      .parent();

    $.ajax({
      url: 'books/delete',
      data: { id: this.id },
      type: 'POST'
    })
      .done(data => {
        if (data) {
          console.log(data);
          row.remove();
        }
      })
      .fail(err => {
        console.log('Error');
      });
  });
  //-------------------------------------------------------END
});

function getRowHtml(item) {
  var thtml =
    getTD(item._id) +
    getTD(item.name) +
    getTD(item.author) +
    getTD(item.year) +
    getTD(item.pages) +
    getDelBtn(item._id);
  thtml = getTR(thtml);
  return thtml;
}
function getTD(val) {
  return '<td>' + val + '</td>';
}

function getTR(val) {
  return '<tr>' + val + '</tr>';
}

function getDelBtn(val) {
  return (
    '<td><button type="button" id=' +
    val +
    ' class="btn btn-default btn-sm btn-del-record"><span class="fa fa-trash-alt"></span> Delete </button></td>'
  );
}
