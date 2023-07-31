import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchGetMemberData } from "../fetchedData/fetchMemberData";


const useMemberData = () => {
    const [memberData, setMemberData] = useState([]);
    const { data: getMemberData, refetch } = useQuery("getMemberData", () => fetchGetMemberData());

    useEffect(() => {
        setMemberData(getMemberData)
    }, [getMemberData])

    return [memberData, refetch]
};

export default useMemberData;