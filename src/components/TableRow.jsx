import React from 'react';
import {IoIosArrowRoundUp} from 'react-icons/io';
const TableRow = ({item}) => {
    const {id,title,username,photo,create_at,update_at, like
    }=item;
    return (

        <tr className=" " >
            <th className=" bg-transparent ">{id}</th>
            <td className=" bg-transparent "  >
            <div className='flex items-center gap-2'>
                <img className=' w-[118px] h-[64px] rounded-lg ' src={photo} alt="" /> <p className=' font-thin text-[20px] text-white' >{title}</p>
              </div>
            </td>
            <td className=" bg-transparent  ">
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

    );
};

export default TableRow;