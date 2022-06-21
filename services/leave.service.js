import axios from "axios";

class LeaveService {
    postLeaveRequest(leaveRequest) {
        return axios.post('https://localhost:5001/api/Request/leave-request', leaveRequest)
            .then((res) => { return res; })
            .catch((err) => { return err.response; });
    }
    postShortLeaveRequest(shortLeaveRequest){
        return axios.post('https://localhost:5001/api/Request/short-leave-request/', shortLeaveRequest)
            .then((res) => { return res; })
            .catch((err) => { return err.response; });
    }
}

export default new LeaveService();