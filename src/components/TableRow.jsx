import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IoIosArrowRoundUp } from 'react-icons/io';
import noImg from '../asset/No_Image_Available.jpg';

const TableRow = ({ item, index }) => {
    const { id, title, username, photo, like } = item;

    return (

        <Draggable draggableId={title} index={index}>
            {(provided) => (
                <tr ref={provided.innerRef} {...provided.draggableProps}>

                    <th width="10%" className=" bg-transparent" {...provided.dragHandleProps}>{id}</th>
                    <td className=" bg-transparent">
                        <div className='flex items-center gap-2 w-[600px]'>
                            {/* <img className=' w-[118px] h-[64px] rounded-lg ' src={photo} alt="" />  */}
                            <img className='min-w-[118px] max-w-none h-[64px] rounded-lg' src={photo} alt=""
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src=noImg;
                                }} />

                            <p className=' whitespace-pre-wrap font-thin text-[20px] text-white' >{title}</p>
                        </div>
                    </td>

                    <td className=" bg-transparent">
                        <div className='flex items-center gap-2'>
                            <div className="avatar">
                                <div className="w-7 rounded-full">
                                    <img src="https://placeimg.com/192/192/people" />
                                </div>
                            </div>
                            <p className=' text-[16px] font-thin text-[#DBFD51] '>{username}</p>
                        </div>
                    </td>

                    <td className=" bg-transparent ">
                        <div className='flex items-center gap-2'>
                            <p className=' text-[16px] font-thin text-white ' >{like}</p>
                            <IoIosArrowRoundUp className=' text-lg text-[#9BFF00] ' />
                        </div>

                    </td>

                </tr>
            )}

        </Draggable>


    );
};

export default TableRow;