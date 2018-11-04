class SmarterForm extends HTMLFormElement {
  constructor() {
    super();
    this.addEventListener('submit', this.submit);
  }

  parseAsJson() {
    return Object.getOwnPropertyNames(this.elements).reduce((data, prop) => {
      const inputField = this.elements.namedItem(prop);
      if (inputField && inputField.value.length > 0) {
        data[inputField.name] = inputField.value;
      }
      return data;
    }, {});
  }

  onResponse() {}

  async submit(e) {
    if (e) {
      e.preventDefault();
    }
    const data = this.parseAsJson();
    const response = await (await fetch(this.action, {
      method: this.method || 'GET',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })).json();
    this.onResponse(response);
    return response;
  }
}

customElements.define('smarter-form', SmarterForm, {
  extends: 'form'
});

const getFullDataFromServer = () => {
  $.ajax({
    url: 'books',
    dataType: 'json'
  })
    .done(data => {
      if (data) {
        var odata = $.parseJSON(JSON.stringify(data.books));
          $('#myTable > tbody').empty();
        odata.forEach(item => {
          $('#myTable > tbody:last-child').append(getRowHtml(item));
        });
      }
    })
    .fail(err => {
      console.log('Error');
    });
};

$(document).ready(function() {
  //on page load keep the book list populated------------START
  getFullDataFromServer();
  //-------------------------------------------------------END

  //on add book submit the form----------------------------START
  $('#btnSubmit').click(() => {
    $('#addBookForm').submit();
  });

  /** @type SmarterForm **/
  const addBookForm = document.querySelector('#addBookForm');

  /** @type HTMLTableElement **/
  const table = document.querySelector('#myTable');

  addBookForm.onResponse = response => {
    const tableRTow = getRowHtml(response, true);
    table.tBodies[0].appendChild(tableRTow);
  };

  //-------------------------------------------------------END

  //on click of delete record----------------------------START
  $(document).on('click', '.btn-del-record', function(event) {
    //identify the row which we will remove from our table.
    var row = $(this)
      .parent()
      .parent();

    $.ajax({
      url: 'books',
      data: { id: this.id },
      type: 'DELETE'
    })
      .done(data => {
        if (data) {
          row.remove();
        }
      })
      .fail(err => {
        console.log('Error');
      });
  });

  //on click of edit record----------------------------START
  $(document).on('click', '.btn-edit-record', function(event) {
    //identify the row which we will remove from our table.
    const bookId = this.getAttribute('data-edit-id');

    $.ajax({
      url: 'books/' + bookId,
      //  data: { id: this.id },
      type: 'GET'
    })
      .done(data => {
        if (data && data.book) {
          Object.keys(data.book).forEach(key => {
            const inputId =
              key === '_id'
                ? 'inputId'
                : 'input' + key.charAt(0).toUpperCase() + key.slice(1);
            const input = document.getElementById(inputId);
            if (input) {
              input.value = data.book[key];
            }
          });
        }
      })
      .fail(err => {
        console.log('Error: ', err);
      });
  });
  //on click of update record----------------------------START
  $(document).on('click', '#btnUpdate', function(event) {
    const { id, pages, year } = addBookForm.parseAsJson();

    $.ajax({
      url: 'books/' + id,
      data: { id, pages, year },
      type: 'PATCH'
    })
      .done(data => {
        getFullDataFromServer();
      })
      .fail(err => {
        console.log('Error: ', err);
      });
  });

    //on click of Clear FORM ----------------------------START
    $(document).on('click', '#btnClear', function(event) {
       addBookForm.reset();
    });


    //-------------------------------------------------------END
});

function getRowHtml(item, useNative = false) {
  var thtml =
    getTD(item._id) +
    getTD(item.name) +
    getTD(item.author) +
    getTD(item.year) +
    getTD(item.pages) +
    getActionsCell(item._id);
  if (useNative) {
    const row = document.createElement('tr');
    row.innerHTML = thtml;
    return row;
  }
  thtml = getTR(thtml);
  return thtml;
}
function getTD(val) {
  return '<td>' + val + '</td>';
}

function getTR(val) {
  return '<tr>' + val + '</tr>';
}

function getActionsCell(val) {
  return (
    '<td><' +
    'button type="button" id=' +
    val +
    ' class="btn btn-default btn-sm btn-del-record">' +
    '<span class="fa fa-trash-alt"></span> Delete </button>' +
    '<button type="button" data-edit-id=' +
    val +
    ' class="btn btn-default btn-sm btn-edit-record">' +
    '<span class="fa fa-pencil-alt"></span> Edit </button>' +
    '</td>'
  );
}
