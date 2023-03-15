import DataTable from 'react-data-table-component';
import AddModal from "@/pages/address/component/addModal";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import EditModal from "@/pages/address/component/editModal";
import {allAddressService, deleteAddressService} from "@/services/address";
import {useSelector} from "react-redux";
import {succesToastMessage} from "@/components/toasts";

export default function AddressList() {
    const columns = [
        {
            name: 'Owner',
            selector: row => row.owner,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'First Name',
            selector: row => row.first_name,
            sortable: true
        },

        {
            name: "İşlemler",
            cell: row => (
                <div className="d-flex">
                    <button className="btn btn-warning me-2" onClick={() => handleEdit(row)} >Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(row)}>Sil</button>
                </div>
            )
        }
    ];

    const [data, setData] = useState([])
    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [filterText, setFilterText] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const token = useSelector(state => state.token.token)

    const getAllData = async () => {
        setLoading(true)
        const response = await allAddressService(token.access)
        setData(response.data.data)
        setLoading(false);
    }

    const handleDataUpdate = (newData) => {
        setData(newData);
    }

    const handleDelete =  (row) =>{
        Swal.fire({
            title: `${row.title.toLocaleUpperCase("TR")} kisiyi silmek istediğinize emin misiniz?`,
            icon: "warning",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Evet",
            denyButtonText: `Hayır`
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `${row.title.toLocaleUpperCase("TR")} kisi silindi`,
                    icon: "success",
                    confirmButtonText: "Kapat",
                });
                setLoading(true)
               await deleteAddressService(row.id, token.access)
                succesToastMessage("kullanici basariyla silindi", 1000)
                setLoading(false)
            }
        });
    }

    const handleEdit = async (row) => {
        setSelectedRows(row)
        setEditShow(true);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePerPageChange = (perPage, page) => {
        setCurrentPage(page);
        setPageSize(perPage);
    };

    const filteredItems = data?.filter(item => item.first_name && item.first_name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()));

    useEffect( () => {
          getAllData()
    }, [ currentPage, itemsPerPage])

    return (
       <>
           <nav className="container">

               <div className="card mt-5">
                   <div className="card-body">
                       <div className="d-flex align-items-center justify-content-evenly">
                           <input className="form-control w-50 h-25" type="text" placeholder="First Name ara" value={filterText}
                                  onChange={(e) => setFilterText(e.target.value)} />
                           <button className="btn btn-primary mb-3 mt-3" onClick={() => setShow(true)}>Ekle</button>
                       </div>
                       <div>
                               <DataTable
                                   className="table table-striped-columns"
                                   columns={columns}
                                   data={filteredItems}
                                   pagination
                                   paginationServer={false}
                                   paginationTotalRows={data.length}
                                   onChangePage={handlePageChange}
                                   onChangeRowsPerPage={handlePerPageChange}
                                   paginationPerPageOptions={[10, 20, 30, 40, 50]}
                                   paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                                   paginationPerPage={pageSize}
                                   paginationComponentOptions={{
                                       rowsPerPageText: 'Sayfa başına öğe:',
                                       rangeSeparatorText: ' / ',
                                       noRowsPerPage: false,
                                       selectAllRowsItem: false,
                                       selectAllRowsItemText: 'Tüm sayfaları seç',
                                   }}
                                   progressPending={loading}
                               />
                       </div>
                   </div>
               </div>
           </nav>
           <AddModal show={show} setShow={setShow} />
           <EditModal editShow={editShow} setEditShow={setEditShow} selectedRows={selectedRows} />
       </>
    )
}
