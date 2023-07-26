import axios from "axios";

export const fetchGetEventData = async () => {
    const response = await axios.get(`http://localhost:5000/api/v1/event`);
    const eventData = response;
    return eventData
}

export const fetchPostEventData = async (eventDataContainer, refetch) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/event/create-event`, eventDataContainer);
        const eventData = response;
        refetch();
        console.log(eventData)
        return eventData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchUpdateEventData = async (idContainer, updateeventDataContainer, refetch) => {
    try {
        const response = await axios.patch(`http://localhost:5000/api/v1/event/${idContainer}`, updateeventDataContainer);
        const eventData = response;
        console.log(eventData)
        refetch();
        return eventData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDeleteEventData = async (theId, refetch) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/v1/event/${theId}`);
        const eventData = response;
        console.log(eventData)
        refetch()
        return eventData;
    } catch (error) {
        console.log(error);
    }
}




