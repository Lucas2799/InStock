function IsPaginationEmpty() {
    let paginationEmpty = document.querySelector('.dt-pagination > ul:empty')

    if (!!paginationEmpty)
        paginationEmpty.parentElement.style.display = "none"
    else
        document.querySelector('.dt-pagination').style.display = "block"
}

function GetActiveRow(row) {
    let style = row.ativo ? "bg-success" : "bg-danger"
    let value = row.ativo ? "Sim" : "Não"
    return `<span class='badge ${style} badge-ativo'>${value}</span>`;
}

function CheckFilterActive(fields) {

    let arrayFields = Array.prototype.slice.call(arguments);

    let isFilterActive = !arrayFields.every((value, index, array) => $(value).val() === "")

    let badge = $('.badge-filter')
    if (isFilterActive)
        badge.removeClass('visually-hidden')
    else
        badge.addClass('visually-hidden')
}

function InitDatatable() {
    const element = document.getElementById('datatablesSimple');
    if (element)
        return new DataTable(element, {
            searching: false,
            language: {
                emptyTable: "Nenhum registro encontrado",
                info: "Exibindo _START_ a _END_ de _TOTAL_ itens",
                infoEmpty: "Exibindo 0 a 0 de 0 itens",
                infoFiltered: "(Filtrados de _MAX_ itens)",
                loadingRecords: "Carregando...",
                processing: "Processando...",
                zeroRecords: "Nenhum Registro encontrado",
                lengthMenu: "_MENU_ Resultados por página",
                paginate: {
                    next: "Próximo",
                    previous: "Anterior",
                    first: "Primeiro",
                    last: "Último"
                }
            },
            dom: 'rt<"dataTable-bottom"lipB>',
            searchable: false,
            orderMulti: false,
            retrieve: true,
            stateSave: true,
            lengthChange: true,
            buttons: [
                {
                    className: 'btn btn-blue',
                    extend: 'collection',
                    text: '<i class="fa-solid fa-cloud-arrow-down"></i>',
                    buttons: [
                        { extend: 'excel', text: 'EXCEL' },
                        { extend: 'pdf', text: 'PDF' },
                        { extend: 'print', text: 'Imprimir' }
                        ]
                }
            ],
            responsive: {
                breakpoints: [
                    { name: 'desktop', width: Infinity },
                    { name: 'tablet', width: 1024 },
                    { name: 'fablet', width: 768 },
                    { name: 'phone', width: 480 }
                ]
            },
            stateSaveParams: function (settings, data) {
                data.filter = window.datatable.filter
                data.collapsedFilter = window.datatable.collapsedFilter
            },
            stateLoadParams: function (settings, data) {
                window.datatable.filter = data.filter
                window.datatable.collapsedFilter = data.collapsedFilter

                if (data.collapsedFilter)
                    $('#collapseFilter').collapse('hide')
                else
                    $('#collapseFilter').collapse('show')
            },
            serverSide: true,
            processing: true,
            ajax: {
                url: `${window.location.pathname}?handler=LoadData`,
                type: 'POST',
                headers: {
                    RequestVerificationToken: $('input:hidden[name="__RequestVerificationToken"]').val()
                },
                data: (data) => {
                    data.Filter = window.datatable.filter
                }
            },
            columnDefs: window.datatable.columnDefs,
        }).on('draw', function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    else
        return
}

window.addEventListener('DOMContentLoaded', event => {
    // DataTables
    // https://datatables.net/manual/

    /*IsPaginationEmpty()*/

    if (window.datatable === undefined)
        window.datatable = {}

    $('#menu-bar a.nav-link[href^="/"').click(() => {
        InitDatatable().state.clear()
    })

    $('#collapseFilter')
        .on('show.bs.collapse hide.bs.collapse', function (e) {
            if (e.type === 'hide')
                window.datatable.collapsedFilter = true
            else
                window.datatable.collapsedFilter = false
            InitDatatable().state.save()
        })

})

$(document).ready(function () {
    var table = $('#example').DataTable({
        lengthChange: false,
        buttons: [
            {
                extend: 'csv',
                split: ['pdf', 'excel'],
            }
        ]
    });

    table.buttons().container()
        .appendTo('#example_wrapper .col-md-6:eq(0)');
});