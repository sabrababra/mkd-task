import React from "react";
import './Table.css';
import Navbar from "../components/Navbar";
import { IoIosArrowDown } from 'react-icons/io'
import TableRow from "../components/TableRow";
import MkdSDK from "../utils/MkdSDK";
import moment from "moment/moment";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const AdminDashboardPage = () => {

  const [data, setData] = React.useState({});
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);

  let sdk = new MkdSDK();
  sdk.setTable('video');
  React.useEffect(() => {
    sdk.callRestAPI({ page: 1, limit: 10, payload: {} }, 'PAGINATE')
      .then(res => {
        console.log('PAGINATE', res);
        setData(res.list);
        setDate(res?.list[0]?.create_at);
        setTime(res?.list[0]?.update_at);
        setPage(res?.page);
        setLimit(res?.limit);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const handleNext = () => {
    sdk.callRestAPI({ page: page + 1, limit: 10, payload: {} }, 'PAGINATE')
      .then(res => {
        console.log('PAGINATE', res);
        setData(res.list);
        setDate(res?.list[0]?.create_at);
        setTime(res?.list[0]?.update_at);
        setPage(res?.page);
        setLimit(res?.limit);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handlePrev = () => {
    sdk.callRestAPI({ page: page - 1, limit: 10, payload: {} }, 'PAGINATE')
      .then(res => {
        console.log('PAGINATE', res);
        setData(res.list);
        setDate(res?.list[0]?.create_at);
        setTime(res?.list[0]?.update_at);
        setPage(res?.page);
        setLimit(res?.limit);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleDragEnd = (results) => {
    let tempUser = [...data];
    let [selectedRow] = tempUser.splice(results.source.index, 1);
    tempUser.splice(results.destination.index, 0, selectedRow);
    setData(tempUser);
  };

  return (


    <>
      <div className=" bg-black min-h-screen ">

        <div className=' pt-10 w-11/12 mx-auto '>
          <Navbar></Navbar>

          <div className="flex justify-between items-center mt-32 ">
            <h1 className=" text-[40px] font-thin text-white " >Today’s leaderboard</h1>
            <div className="flex gap-2 bg-[#1D1D1D] py-5 px-6 rounded-2xl text-white text-[16px]  font-thin ">
              <p>{moment(date).format('ll')}</p>
              <p>.</p>
              <p className=" bg-[#9bff00] py-1 px-2 rounded-lg text-black " >
                Submissions OPEN</p>
              <p>.</p>
              <p>{moment(time).format('hh:mm')}</p>

            </div>
          </div>

          {/* Table */}

          <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
            <div className=" mt-10 ">
              <div className="overflow-x-auto">
                <table className=" table w-full make-design">
                  {/* <!-- head --> */}
                  <thead  >
                    <tr className="text-[#696969] font-thin text-[16px] ">
                      <th className=" bg-transparent ">#</th>
                      <th className=" bg-transparent ">Title</th>
                      <th className=" bg-transparent ">Author</th>

                      <th className=" bg-transparent flex items-center  ">Most Liked <IoIosArrowDown className="w-8 ml-1" /> </th>
                    </tr>
                  </thead>

                  <Droppable droppableId="tbody">
                    {(provided) => (
                      <tbody ref={provided.innerRef} {...provided.droppableProps}>
                        {
                          data?.length > 0
                            ?
                            data?.map((item, index) => <TableRow
                              key={item.id}
                              item={item}
                              index={index}
                            ></TableRow>) :
                            <p className="text-white font-bold text-xl text-center" >No data found</p>
                        }
                        {provided.placeholder}
                      </tbody>

                    )
                    }
                  </Droppable>
                </table>
              </div>
            </div>
          </DragDropContext>


          <div className="btn-group grid grid-cols-2 mt-5 pb-7 w-4/12 mx-auto">
            <button className="btn btn-outline " onClick={handlePrev}>Previous page</button>
            <button className="btn btn-outline" onClick={handleNext}>Next</button>
          </div>
        </div>



      </div>
    </>
  );
};

export default AdminDashboardPage;
